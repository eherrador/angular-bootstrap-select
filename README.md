angular-bootstrap-select
========================

## Overview

A dependency-free directive to turn a select into a bootstrap dropdown select.

## Usage

```html
<select bootstrap-select ng-options="person.id for person in people" ng-model="currentPerson"></select>
```

## Important!

As per #1, make sure you have already declared the model (used in ngModel) on the scope.

## Options

### Auto-width

Calculates the minimum width required to show all select entries (stops the dropdown button from changing size depending on the length of the option).

```html
<select bootstrap-select auto-width="true" ng-options="person.id for person in people" ng-model="currentPerson"></select>
```