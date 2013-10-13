angular.module('angular-bootstrap-select', [])

.directive('bootstrapSelect', ['$compile', '$parse', '$timeout', function($compile, $parse, $timeout) {

	return {
		restrict: 'AE',
		require: ['?ngModel'],
		link: function(scope, element, attrs, ctrl) {

			if(!ctrl[0]) {
				// we need the ngModel controller
				return;
			}

			var BOOTSTRAP_SELECT_DATA = '$bootstrapSelect';
			var ngModelCtrl = ctrl[0];
			var template =  "<div class=\"btn-group bootstrap-select\" ng-init=\"current = {}\">\n" +
    "	<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n" +
    "		<span class=\"selected\">{{ current.selection.label }}</span>\n" +
    "		<span class=\"caret\"></span>\n" +
    "	</button>\n" +
    "	<ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "		<li role=\"presentation\" ng-repeat=\"option in $options\" ng-click=\"current.selection = option\">\n" +
    "			<a role=\"menuitem\" tab-index=\"-1\">{{ option.label }}</a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>";

			var dropdown = angular.element(template);
			var dropdownScope = scope.$new(true);
			$compile(dropdown)(dropdownScope);
			// update the classes on the dropdown container whenever they change on the select
			var initialClasses = dropdown[0].className;
			attrs.$observe('class', function(classes) {
				dropdown[0].className = initialClasses + " " + classes;
			});

			element.after(dropdown);
			element.css('display', 'none');

			// from ngOptionsDirective AngularJS 1.2.0-rc2
			var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;
			var match = attrs.ngOptions.match(NG_OPTIONS_REGEXP);
			var valueName = match[4] || match[6];
			var valueFn = $parse(match[2] ? match[1] : valueName);
            var valuesFn = $parse(match[7]);
			var displayFn = $parse(match[2] || match[1]);

			var buildObjFromOptionElement = function( optionEl ) {
				return {
					index: optionEl.val(),
					label: optionEl.text()
				};
			};

			var updateOptions = function( items ) {
				var options = element.find('option');
				dropdownScope.$options = [];
				angular.forEach(options, function(option) {
					var o = angular.element(option);
					var data = buildObjFromOptionElement(o);
					if( items && items[data.index] ) {
						data.value = items[data.index];
					} else {
						data.value = null;
					}
					o.data(BOOTSTRAP_SELECT_DATA, data);
					dropdownScope.$options.push(data);
				});
			};

			var updateSelected = function( val ) {
				var options = element.find('option');
				angular.forEach(options, function(option) {
					var o = angular.element(option);
					if( element.val() === o.val() ) {
						dropdownScope.current.selection = o.data(BOOTSTRAP_SELECT_DATA);
						return;
					}
				});
			};

			// update options when the collection changes
			scope.$watch(valuesFn, updateOptions);
			scope.$watch(attrs.ngModel, function(n, o) {
				updateSelected(n);
			});

			// update the select and the model when our selection changes
			dropdownScope.$watch('current.selection', function(n) {
				$timeout(function() {
					element.val(n.index);
					element.triggerHandler('change');
				});
			});

		}
	};
	
}])

/**
 * From Angular UI Bootstrap
 * http://angular-ui.github.io/bootstrap/
 */
.directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
  var openElement = null,
      closeMenu   = angular.noop;
  return {
    restrict: 'CA',
    link: function(scope, element, attrs) {
      scope.$watch('$location.path', function() { closeMenu(); });
      element.parent().bind('click', function() { closeMenu(); });
      element.bind('click', function (event) {

        var elementWasOpen = (element === openElement);

        event.preventDefault();
        event.stopPropagation();

        if (!!openElement) {
          closeMenu();
        }

        if (!elementWasOpen) {
          element.parent().addClass('open');
          openElement = element;
          closeMenu = function (event) {
            if (event) {
              event.preventDefault();
              event.stopPropagation();
            }
            $document.unbind('click', closeMenu);
            element.parent().removeClass('open');
            closeMenu = angular.noop;
            openElement = null;
          };
          $document.bind('click', closeMenu);
        }
      });
    }
  };
}])

;