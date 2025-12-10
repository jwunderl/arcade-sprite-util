# null Consts

Returns special null-like values including undefined and null.

## Parameters

* **constType**: the constant to return (undefined or null)

## Returns

* **undefined** or **null** based on the selected constant

## Example

This example checks if a value is undefined:

```blocks
let myValue = spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
if (myValue == undefined) {
    console.log("Value is undefined")
}
```

## See also

[consts](/arcade-sprite-util/docs/consts)

```package
spriteutils=github:jwunderl/arcade-sprite-util
```
