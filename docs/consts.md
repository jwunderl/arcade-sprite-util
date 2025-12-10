# consts

Returns mathematical and special constants including π (pi), e (Euler's number), and other useful values.

## Parameters

* **constType**: the constant to return (π, e, NaN, LN2, LN10, √1/2, or √2)

## Returns

* a **number** representing the selected constant

## Example

This example uses π to calculate the circumference of a circle:

```blocks
let radius = 10
let circumference = 2 * spriteutils.consts(spriteutils.Consts.Pi) * radius
console.log("Circumference: " + circumference)
```

## See also

[null consts](/arcade-sprite-util/docs/null-consts)

```package
spriteutils=github:jwunderl/arcade-sprite-util
```
