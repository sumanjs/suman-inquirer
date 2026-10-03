// ores-lint house config for suman-inquirer.
//
// MIGRATION NOTE: rules lived under package.json's `eslintConfig` key, which
// ESLint 9+ ignores, so none were enforced. Ported semantically:
//
//   "quotes": ["error", "single"]        -> ported (warn)
//   "eqeqeq": ["error", "allow-null"]    -> the house baseline already uses
//                                           `eqeqeq: smart`, which permits
//                                           `== null`. Same intent, kept as-is.
//   "no-unused-expressions": "off"       -> not in the baseline; no-op
//   "handle-callback-err": "off"         -> rule no longer exists in core
//   "no-eq-null": "off"                  -> not in the baseline; no-op
//   "env": { mocha: true }               -> the baseline does not enable
//                                           `no-undef`, so mocha globals were
//                                           never going to be flagged.
//   "extends": "xo-space"                -> NOT ported (external package, not
//                                           installed). xo-space is mostly
//                                           formatting, which stays out of
//                                           ores-lint by design.
import oresConfig from './.ores-lint/eslint/base.mjs';

export default await oresConfig({
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
  },
});
