/*
Base on
https://github.com/estools/esutils/blob/a825f91fd1d1e3a9fff84227cb06c011d8a0b9e8/tools/generate-identifier-regex.js#L1
https://gist.github.com/mathiasbynens/6334847 by @mathias
*/

import regenerate from "regenerate";

// Which Unicode version should be used
const version = "9.0.0";

// Set up a shorthand function to import Unicode data.
const get = async function (what) {
  const { default: codePoints } = await import(
    "unicode-" + version + "/" + what + "/code-points.js"
  );
  return codePoints;
};

// Get the Unicode categories needed to construct the ES5 regex.
const Lu = await get("General_Category/Uppercase_Letter");
const Ll = await get("General_Category/Lowercase_Letter");
const Lt = await get("General_Category/Titlecase_Letter");
const Lm = await get("General_Category/Modifier_Letter");
const Lo = await get("General_Category/Other_Letter");
const Nl = await get("General_Category/Letter_Number");
const Mn = await get("General_Category/Nonspacing_Mark");
const Mc = await get("General_Category/Spacing_Mark");
const Nd = await get("General_Category/Decimal_Number");
const Pc = await get("General_Category/Connector_Punctuation");

// ES 5.1
// http://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
const identifierStart = regenerate()
  .add(Lu, Ll, Lt, Lm, Lo, Nl)
  .removeRange(0x010000, 0x10ffff) // remove astral symbols
  .removeRange(0x00, 0x7f); // remove ASCII symbols (esutils-specific)
const identifierStartCodePoints = identifierStart.toArray();
const identifierPart = regenerate(identifierStartCodePoints)
  .add("\u200C", "\u200D", Mn, Mc, Nd, Pc)
  .removeRange(0x010000, 0x10ffff) // remove astral symbols
  .removeRange(0x00, 0x7f); // remove ASCII symbols (esutils-specific)

export const nonAsciiIdentifierStart = identifierStart.toRegExp();
export const nonAsciiIdentifierPart = identifierPart.toRegExp();
