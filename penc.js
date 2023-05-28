"use strict";
var penc = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/pil/pil.pen
  var require_pil = __commonJS({
    "src/pil/pil.pen"(exports2, module2) {
      "use strict";
      (function(m) {
        var __name2 = /* @__PURE__ */ __name((x) => x, "__name");
        var IN;
        var IPOS;
        var ILEN;
        var OUT;
        var OPOS;
        var TYPE = 0;
        var UNTYPED = 0;
        var SCALAR = 1;
        var STRING = 6;
        var STRING_FAST = 4;
        var LIST = 8;
        var RECORD = 16;
        var DEFAULT_BUFFER_SIZE = 2 ** 22;
        function $assert(value, message) {
          if (value)
            return;
          throw new Error(`Assertion failed: ${message !== null && message !== void 0 ? message : "no further details"}`);
        }
        __name($assert, "$assert");
        __name2($assert, "$assert");
        var onReset = [];
        function $parse(stringOrBytes) {
          if (typeof stringOrBytes === "string") {
            OUT = new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
            for (var char of stringOrBytes)
              writeUtf8Codepoint(char.codePointAt(0));
            if (OPOS > OUT.length)
              throw new Error("input buffer too small");
            IN = OUT;
            ILEN = OPOS;
          } else {
            IN = stringOrBytes;
            ILEN = IN.length;
          }
          OUT = [];
          IPOS = 0;
          OPOS = 0;
          onReset.forEach((cb) => cb());
          if (!parseValue(ᝍstartᐅ2))
            throw new Error("parse failed");
          if (IPOS !== ILEN)
            throw new Error("parse did not consume entire input");
          if (OPOS !== 1)
            throw new Error("parse did not produce a singular value");
          return OUT[0];
        }
        __name($parse, "$parse");
        __name2($parse, "$parse");
        function parseValue(rule) {
          var OPOSₒ = OPOS, TYPEₒ = TYPE;
          TYPE = UNTYPED;
          if (!rule())
            return TYPE = TYPEₒ, false;
          $assert(TYPE !== UNTYPED, "rule did not produce a value");
          if (TYPE === STRING_FAST && OPOS - OPOSₒ >= 65536)
            TYPE = STRING;
          switch (TYPE) {
            case SCALAR:
              $assert(OPOS === OPOSₒ + 1);
              break;
            case STRING:
              for (var str = "", i = OPOSₒ; i < OPOS; i += 65536) {
                str += String.fromCodePoint.apply(String, OUT.slice(i, Math.min(i + 65536, OPOS)));
              }
              OUT[OPOSₒ] = str;
              break;
            case STRING_FAST:
              OUT[OPOSₒ] = String.fromCharCode.apply(String, OUT.slice(OPOSₒ, OPOS));
              break;
            case LIST:
              OUT[OPOSₒ] = OUT.slice(OPOSₒ, OPOS);
              break;
            case RECORD:
              var obj = {};
              for (var i = OPOSₒ; i < OPOS; i += 2) {
                var label2 = OUT[i];
                $assert(!obj.hasOwnProperty(label2), `Duplicate label '${label2}' in record`);
                obj[label2] = OUT[i + 1];
              }
              OUT[OPOSₒ] = obj;
              break;
            default:
              ((type) => $assert(false, `Unhandled type ${type}`))(TYPE);
          }
          OPOS = OPOSₒ + 1;
          TYPE = TYPEₒ;
          return true;
        }
        __name(parseValue, "parseValue");
        __name2(parseValue, "parseValue");
        function $print(value, outputBytes) {
          IN = [value];
          OUT = outputBytes ?? new Uint8Array(DEFAULT_BUFFER_SIZE);
          IPOS = 0;
          ILEN = 1;
          OPOS = 0;
          onReset.forEach((cb) => cb());
          if (!printValue(ᐊstartᝍ2))
            throw new Error("print failed");
          if (OPOS > OUT.length)
            throw new Error("output buffer too small");
          if (outputBytes)
            return OPOS;
          IN = OUT, IPOS = 0, ILEN = OPOS;
          var codepoints = [], string = "";
          while (IPOS < ILEN) {
            var cp = readUtf8Codepoint();
            if (cp === -1)
              throw new Error("output buffer is not valid utf-8");
            if (codepoints.push(cp) >= 65536 || IPOS >= ILEN) {
              string += String.fromCodePoint.apply(String, codepoints);
              codepoints.length = 0;
            }
          }
          return string;
        }
        __name($print, "$print");
        __name2($print, "$print");
        function printValue(rule) {
          if (IPOS >= ILEN)
            return false;
          var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN, TYPEₒ = TYPE;
          var value = IN[IPOS];
          $assert(value !== void 0, `'undefined' is not a valid value in an AST`);
          if (value === null || value === true || value === false || typeof value === "number") {
            TYPE = SCALAR;
            var result = rule();
            TYPE = TYPEₒ;
            $assert(!result || IPOS === IPOSₒ + 1);
            return result;
          }
          if (typeof value === "string") {
            TYPE = STRING;
            IN = [];
            for (var i = 0; i < value.length; ++i) {
              var cp = value.charCodeAt(i);
              IN.push(cp);
              if (cp < 55296 || cp >= 57344)
                continue;
              IN[IN.length - 1] = value.codePointAt(i++);
            }
          } else if (Array.isArray(value)) {
            TYPE = LIST;
            IN = value;
          } else if (typeof value === "object") {
            TYPE = RECORD;
            IN = [];
            var objKeys = Object.keys(value);
            for (var i = 0; i < objKeys.length; ++i)
              IN.push(objKeys[i], value[objKeys[i]]);
          } else {
            throw new Error(`Unsupported value type for value ${value}`);
          }
          IPOS = 0;
          ILEN = IN.length;
          var result = rule();
          var IPOSᐟ = IPOS, ILENᐟ = ILEN;
          IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ, TYPE = TYPEₒ;
          if (!result)
            return false;
          if (IPOSᐟ !== ILENᐟ)
            return false;
          IPOS += 1;
          return true;
        }
        __name(printValue, "printValue");
        __name2(printValue, "printValue");
        function createLeftrec(rule) {
          var saved;
          return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function leftrec() {
            if (saved?.IN === IN && saved.IPOS === IPOS && (TYPE === UNTYPED || TYPE === saved.TYPE)) {
              TYPE |= saved.TYPE;
              IPOS += saved.ΔIPOS;
              for (var i = 0; i < saved.ΔOUT.length; ++i)
                OUT[OPOS++] = saved.ΔOUT[i];
              return saved.result;
            }
            var savedₒ = saved, result = false;
            saved = { IN, IPOS, result, TYPE, ΔIPOS: 0, ΔOUT: [] };
            var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
            while (true) {
              IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
              result = rule();
              if (result && (!saved.result || IPOS - IPOSₒ > saved.ΔIPOS)) {
                saved.result = result;
                saved.TYPE = TYPE;
                saved.ΔIPOS = IPOS - IPOSₒ;
                saved.ΔOUT = OUT.slice(OPOSₒ, OPOS);
                continue;
              }
              IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
              leftrec();
              saved = savedₒ;
              return result;
            }
          }, "leftrec"), "leftrec");
        }
        __name(createLeftrec, "createLeftrec");
        __name2(createLeftrec, "createLeftrec");
        function readUtf8Codepoint() {
          $assert(IN instanceof Uint8Array);
          var unread = ILEN - IPOS;
          if (unread < 1)
            return -1;
          var cp = IN[IPOS];
          var byteCount = UTF8_BYTE_COUNT[cp >> 3];
          if (byteCount === 0 || unread < byteCount)
            return -1;
          cp &= UTF8_BYTE1_MASK[byteCount];
          for (var i = 1; i < byteCount; ++i) {
            var nextByte = IN[IPOS + i];
            if ((nextByte & 192) !== 128)
              return -1;
            cp = (cp << 6) + (nextByte & 63);
          }
          if (cp < UTF8_MIN_CODEPOINT[byteCount] || cp > UTF8_MAX_CODEPOINT[byteCount])
            return -1;
          IPOS += byteCount;
          return cp;
        }
        __name(readUtf8Codepoint, "readUtf8Codepoint");
        __name2(readUtf8Codepoint, "readUtf8Codepoint");
        function writeUtf8Codepoint(cp) {
          if (cp < 128) {
            OUT[OPOS++] = cp;
          } else if (cp < 2048) {
            OUT[OPOS++] = 192 | cp >> 6;
            OUT[OPOS++] = 128 | cp & 63;
          } else if (cp < 65536) {
            OUT[OPOS++] = 224 | cp >> 12;
            OUT[OPOS++] = 128 | cp >> 6 & 63;
            OUT[OPOS++] = 128 | cp & 63;
          } else {
            OUT[OPOS++] = 240 | cp >> 18;
            OUT[OPOS++] = 128 | cp >> 12 & 63;
            OUT[OPOS++] = 128 | cp >> 6 & 63;
            OUT[OPOS++] = 128 | cp & 63;
          }
        }
        __name(writeUtf8Codepoint, "writeUtf8Codepoint");
        __name2(writeUtf8Codepoint, "writeUtf8Codepoint");
        var UTF8_BYTE_COUNT = [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          // 00xxx
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          // 01xxx
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          // 10xxx
          2,
          2,
          2,
          2,
          3,
          3,
          4,
          0
          // 11000 11001 11010 11011 11100 11101 11110 11111
        ];
        var UTF8_BYTE1_MASK = [0, 255, 31, 15, 7];
        var UTF8_MIN_CODEPOINT = [0, 0, 128, 2048, 65536];
        var UTF8_MAX_CODEPOINT = [0, 127, 2047, 65535, 1114111];
        function parseUtf8Float() {
          $assert(IN instanceof Uint8Array);
          var IPOSₒ = IPOS, IPOSᐟ;
          var cc = IN[IPOS];
          if (cc === 43 || cc === 45)
            cc = IN[++IPOS];
          IPOSᐟ = IPOS;
          while (cc >= 48 && cc <= 57)
            cc = IN[++IPOS];
          if (IPOSᐟ === IPOS)
            return IPOS = IPOSₒ, false;
          if (cc === 46) {
            cc = IN[++IPOS];
            IPOSᐟ = IPOS;
            while (cc >= 48 && cc <= 57)
              cc = IN[++IPOS];
            if (IPOSᐟ === IPOS)
              return IPOS = IPOSₒ, false;
          }
          if (cc === 69 || cc === 101) {
            cc = IN[++IPOS];
            if (cc === 43 || cc === 45)
              cc = IN[++IPOS];
            IPOSᐟ = IPOS;
            while (cc >= 48 && cc <= 57)
              cc = IN[++IPOS];
            if (IPOSᐟ === IPOS)
              return IPOS = IPOSₒ, false;
          }
          if (IPOS > ILEN)
            return IPOS = IPOSₒ, false;
          var num = Number.parseFloat(String.fromCharCode(...IN.slice(IPOSₒ, IPOS)));
          if (!Number.isFinite(num))
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = num;
          TYPE |= SCALAR;
          return true;
        }
        __name(parseUtf8Float, "parseUtf8Float");
        __name2(parseUtf8Float, "parseUtf8Float");
        function printUtf8Float() {
          if (TYPE !== SCALAR)
            return false;
          const num = IN[IPOS];
          if (typeof num !== "number")
            return false;
          IPOS += 1;
          for (var char of String(num))
            OUT[OPOS++] = char.charCodeAt(0);
          return true;
        }
        __name(printUtf8Float, "printUtf8Float");
        __name2(printUtf8Float, "printUtf8Float");
        function createUtf8IntParser({ base, signed }) {
          $assert(typeof base === "number" && base >= 2 && base <= 36);
          $assert(typeof signed === "boolean");
          return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseUtf8Int() {
            $assert(IN instanceof Uint8Array);
            var IPOSₒ = IPOS;
            var MAX_NUM = signed ? 2147483647 : 4294967295;
            var isNegative = false;
            if (signed && IPOS < ILEN && IN[IPOS] === HYPHEN) {
              isNegative = true;
              MAX_NUM = 2147483648;
              IPOS += 1;
            }
            var num = 0;
            var digits = 0;
            while (IPOS < ILEN) {
              var c2 = IN[IPOS];
              var digitValue = DIGIT_VALUES[c2];
              if (digitValue >= base)
                break;
              num *= base;
              num += digitValue;
              if (num > MAX_NUM)
                return IPOS = IPOSₒ, false;
              IPOS += 1;
              digits += 1;
            }
            if (digits === 0)
              return IPOS = IPOSₒ, false;
            if (isNegative)
              num = -num;
            OUT[OPOS++] = num;
            TYPE |= SCALAR;
            return true;
          }, "parseUtf8Int"), "parseUtf8Int");
        }
        __name(createUtf8IntParser, "createUtf8IntParser");
        __name2(createUtf8IntParser, "createUtf8IntParser");
        function createUtf8IntPrinter({ base, signed }) {
          $assert(typeof base === "number" && base >= 2 && base <= 36);
          $assert(typeof signed === "boolean");
          return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function printUtf8Int() {
            if (TYPE !== SCALAR)
              return false;
            let num = IN[IPOS];
            if (typeof num !== "number")
              return false;
            let isNegative = false;
            let MAX_NUM = 2147483647;
            if (num < 0) {
              if (!signed)
                return false;
              isNegative = true;
              num = -num;
              MAX_NUM = 2147483648;
            }
            if (num > MAX_NUM)
              return false;
            const digits = [];
            while (true) {
              const d2 = num % base;
              num = num / base | 0;
              digits.push(CHAR_CODES[d2]);
              if (num === 0)
                break;
            }
            IPOS += 1;
            if (isNegative)
              OUT[OPOS++] = HYPHEN;
            for (let i = digits.length; i > 0; ) {
              OUT[OPOS++] = digits[--i];
            }
            return true;
          }, "printUtf8Int"), "printUtf8Int");
        }
        __name(createUtf8IntPrinter, "createUtf8IntPrinter");
        __name2(createUtf8IntPrinter, "createUtf8IntPrinter");
        var DIGIT_VALUES = [
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // 00-0f
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // 10-1f
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // 20-2f
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          80,
          80,
          80,
          80,
          80,
          80,
          // 30-3f
          80,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          // 40-4f
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          80,
          80,
          80,
          80,
          80,
          // 50-5f
          80,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          // 60-6f
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          80,
          80,
          80,
          80,
          80,
          // 70-7f
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // 80-8f
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // 90-9f
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // a0-af
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // b0-bf
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // c0-cf
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // d0-df
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          // e0-ef
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80,
          80
          // f0-ff
        ];
        var CHAR_CODES = [
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          // 0-7      01234567
          56,
          57,
          65,
          66,
          67,
          68,
          69,
          70,
          // 8-15     89ABCDEF
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          // 16-23    GHIJKLMN
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          // 24-31    OPQRSTUV
          87,
          88,
          89,
          90
          // 32-35    WXYZ
        ];
        var HYPHEN = "-".charCodeAt(0);
        function createUtf8UecharParser({ base, minlen, maxlen }) {
          $assert(typeof base === "number" && base >= 2 && base <= 36);
          $assert(typeof minlen === "number" && minlen >= 1 && minlen <= 8);
          $assert(typeof maxlen === "number" && maxlen >= minlen && maxlen <= 8);
          return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseUtf8Codepoint() {
            $assert(IN instanceof Uint8Array);
            var IPOSₒ = IPOS;
            var cp = 0;
            var digitCount = 0;
            while (IPOS < ILEN) {
              var c2 = IN[IPOS];
              var digitValue = DIGIT_VALUES[c2];
              if (digitValue >= base)
                break;
              cp = cp * base + digitValue;
              IPOS += 1;
              digitCount += 1;
              if (digitCount === maxlen)
                break;
            }
            if (digitCount < minlen)
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = cp;
            TYPE |= cp < 55296 ? STRING_FAST : STRING;
            return true;
          }, "parseUtf8Codepoint"), "parseUtf8Codepoint");
        }
        __name(createUtf8UecharParser, "createUtf8UecharParser");
        __name2(createUtf8UecharParser, "createUtf8UecharParser");
        function createUtf8UecharPrinter({ base, minlen, maxlen }) {
          $assert(typeof base === "number" && base >= 2 && base <= 36);
          $assert(typeof minlen === "number" && minlen >= 1 && minlen <= 8);
          $assert(typeof maxlen === "number" && maxlen >= minlen && maxlen <= 8);
          return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function printUtf8Codepoint() {
            if (TYPE !== STRING || IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            const s = cp.toString(base).padStart(minlen, "0");
            if (s.length > maxlen)
              return false;
            for (var char of s)
              OUT[OPOS++] = char.charCodeAt(0);
            return true;
          }, "printUtf8Codepoint"), "printUtf8Codepoint");
        }
        __name(createUtf8UecharPrinter, "createUtf8UecharPrinter");
        __name2(createUtf8UecharPrinter, "createUtf8UecharPrinter");
        function ᝍstartᐅ2() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍWS0ᐅ() && ᝍlinesᐅ() && ᝍWS0ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍstartᐅ2, "ᝍstartᐅ");
        function ᝍlinesᐅ() {
          return ᝍ$1ᐅ() || ᝍ$4ᐅ();
        }
        __name(ᝍlinesᐅ, "ᝍlinesᐅ");
        function ᝍ$1ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍlineᐅ() && ᝍ$2ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$1ᐅ, "ᝍ$1ᐅ");
        function ᝍ$2ᐅ() {
          while (ᝍ$3ᐅ())
            ;
          return true;
        }
        __name(ᝍ$2ᐅ, "ᝍ$2ᐅ");
        function ᝍ$3ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍWS0ᐅ() && ᝍlineᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$3ᐅ, "ᝍ$3ᐅ");
        function ᝍ$4ᐅ() {
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$4ᐅ, "ᝍ$4ᐅ");
        function ᝍlineᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$5ᐅ() && ᝍEOLᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍlineᐅ, "ᝍlineᐅ");
        function ᝍ$5ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          if (!parseValue(ᝍ$6ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          $assert(typeof OUT[OPOS - 1] === "string");
          if (!parseValue(ᝍ$12ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$5ᐅ, "ᝍ$5ᐅ");
        function ᝍ$6ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$7ᐅ() && ᝍidᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$6ᐅ, "ᝍ$6ᐅ");
        function ᝍ$7ᐅ() {
          return ᝍ$8ᐅ() || true;
        }
        __name(ᝍ$7ᐅ, "ᝍ$7ᐅ");
        function ᝍ$8ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$9ᐅ() && ᝍ$10ᐅ() && ᝍEOLᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$8ᐅ, "ᝍ$8ᐅ");
        function ᝍ$9ᐅ() {
          return false;
        }
        __name(ᝍ$9ᐅ, "ᝍ$9ᐅ");
        function ᝍ$10ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$11ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$10ᐅ, "ᝍ$10ᐅ");
        function ᝍ$11ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 36)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 36;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$11ᐅ, "ᝍ$11ᐅ");
        function ᝍ$12ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHS4ᐅ() && ᝍruleᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$12ᐅ, "ᝍ$12ᐅ");
        function ᝍruleᐅ() {
          return ᝍassertionᐅ() || ᝍbyteᐅ() || ᝍchar_ᐅ() || ᝍis_parseᐅ() || ᝍis_printᐅ() || ᝍiterationᐅ() || ᝍlistᐅ() || ᝍnegationᐅ() || ᝍrecordᐅ() || ᝍscalarᐅ() || ᝍselectionᐅ() || ᝍsequenceᐅ() || ᝍstringᐅ() || ᝍutf8_charᐅ() || ᝍutf8_floatᐅ() || ᝍutf8_intᐅ() || ᝍutf8_stringᐅ() || ᝍutf8_uecharᐅ();
        }
        __name(ᝍruleᐅ, "ᝍruleᐅ");
        function ᝍassertionᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$14ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$16ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍassertionᐅ, "ᝍassertionᐅ");
        function ᝍ$14ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 111)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$14ᐅ, "ᝍ$14ᐅ");
        function ᝍ$16ᐅ() {
          if (!parseValue(ᝍ$17ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$16ᐅ, "ᝍ$16ᐅ");
        function ᝍ$17ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$17ᐅ, "ᝍ$17ᐅ");
        function ᝍbyteᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$20ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$22ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍbyteᐅ, "ᝍbyteᐅ");
        function ᝍ$20ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 98)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 121)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 98;
          OUT[OPOS++] = 121;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$20ᐅ, "ᝍ$20ᐅ");
        function ᝍ$22ᐅ() {
          if (!parseValue(ᝍ$23ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$22ᐅ, "ᝍ$22ᐅ");
        function ᝍ$23ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrangeHexᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$23ᐅ, "ᝍ$23ᐅ");
        function ᝍchar_ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$26ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$28ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍchar_ᐅ, "ᝍchar_ᐅ");
        function ᝍ$26ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 104)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$26ᐅ, "ᝍ$26ᐅ");
        function ᝍ$28ᐅ() {
          if (!parseValue(ᝍ$29ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$28ᐅ, "ᝍ$28ᐅ");
        function ᝍ$29ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrangeHexᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$29ᐅ, "ᝍ$29ᐅ");
        function ᝍis_parseᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$32ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$34ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍis_parseᐅ, "ᝍis_parseᐅ");
        function ᝍ$32ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 112)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 112;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$32ᐅ, "ᝍ$32ᐅ");
        function ᝍ$34ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$34ᐅ, "ᝍ$34ᐅ");
        function ᝍis_printᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$37ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$39ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍis_printᐅ, "ᝍis_printᐅ");
        function ᝍ$37ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 112)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 112;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$37ᐅ, "ᝍ$37ᐅ");
        function ᝍ$39ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$39ᐅ, "ᝍ$39ᐅ");
        function ᝍiterationᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$42ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$44ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍiterationᐅ, "ᝍiterationᐅ");
        function ᝍ$42ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 111)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$42ᐅ, "ᝍ$42ᐅ");
        function ᝍ$44ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          if (!parseValue(ᝍ$45ᐅ))
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          if (!parseValue(ᝍ$46ᐅ))
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$44ᐅ, "ᝍ$44ᐅ");
        function ᝍ$45ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrangeDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$45ᐅ, "ᝍ$45ᐅ");
        function ᝍ$46ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$46ᐅ, "ᝍ$46ᐅ");
        function ᝍlistᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$49ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$51ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍlistᐅ, "ᝍlistᐅ");
        function ᝍ$49ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 108)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$49ᐅ, "ᝍ$49ᐅ");
        function ᝍ$51ᐅ() {
          return ᝍ$52ᐅ() || ᝍ$55ᐅ();
        }
        __name(ᝍ$51ᐅ, "ᝍ$51ᐅ");
        function ᝍ$52ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$53ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$53ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$52ᐅ, "ᝍ$52ᐅ");
        function ᝍ$53ᐅ() {
          if (!parseValue(ᝍ$54ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$53ᐅ, "ᝍ$53ᐅ");
        function ᝍ$54ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$54ᐅ, "ᝍ$54ᐅ");
        function ᝍ$55ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$55ᐅ, "ᝍ$55ᐅ");
        function ᝍnegationᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$58ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$60ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍnegationᐅ, "ᝍnegationᐅ");
        function ᝍ$58ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 103)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 111)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$58ᐅ, "ᝍ$58ᐅ");
        function ᝍ$60ᐅ() {
          if (!parseValue(ᝍ$61ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$60ᐅ, "ᝍ$60ᐅ");
        function ᝍ$61ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$61ᐅ, "ᝍ$61ᐅ");
        function ᝍrecordᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$64ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$66ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍrecordᐅ, "ᝍrecordᐅ");
        function ᝍ$64ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 111)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 100)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 100;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$64ᐅ, "ᝍ$64ᐅ");
        function ᝍ$66ᐅ() {
          return ᝍ$67ᐅ() || ᝍ$70ᐅ();
        }
        __name(ᝍ$66ᐅ, "ᝍ$66ᐅ");
        function ᝍ$67ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$68ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$68ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$67ᐅ, "ᝍ$67ᐅ");
        function ᝍ$68ᐅ() {
          if (!parseValue(ᝍ$69ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$68ᐅ, "ᝍ$68ᐅ");
        function ᝍ$69ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$69ᐅ, "ᝍ$69ᐅ");
        function ᝍ$70ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$70ᐅ, "ᝍ$70ᐅ");
        function ᝍscalarᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$73ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$75ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍscalarᐅ, "ᝍscalarᐅ");
        function ᝍ$73ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 108)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$73ᐅ, "ᝍ$73ᐅ");
        function ᝍ$75ᐅ() {
          if (!parseValue(ᝍ$76ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$75ᐅ, "ᝍ$75ᐅ");
        function ᝍ$76ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$78ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "value";
          if (!parseValue(ᝍ$80ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$76ᐅ, "ᝍ$76ᐅ");
        function ᝍ$78ᐅ() {
          OUT[OPOS++] = 67;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$78ᐅ, "ᝍ$78ᐅ");
        function ᝍ$80ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍ$81ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$80ᐅ, "ᝍ$80ᐅ");
        function ᝍ$81ᐅ() {
          return ᝍnumᐅ() || ᝍboolᐅ() || ᝍnull_ᐅ();
        }
        __name(ᝍ$81ᐅ, "ᝍ$81ᐅ");
        function ᝍselectionᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$84ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$86ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍselectionᐅ, "ᝍselectionᐅ");
        function ᝍ$84ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 108)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 111)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$84ᐅ, "ᝍ$84ᐅ");
        function ᝍ$86ᐅ() {
          return ᝍ$87ᐅ() || ᝍ$90ᐅ();
        }
        __name(ᝍ$86ᐅ, "ᝍ$86ᐅ");
        function ᝍ$87ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$88ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$88ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$87ᐅ, "ᝍ$87ᐅ");
        function ᝍ$88ᐅ() {
          if (!parseValue(ᝍ$89ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$88ᐅ, "ᝍ$88ᐅ");
        function ᝍ$89ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$89ᐅ, "ᝍ$89ᐅ");
        function ᝍ$90ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$90ᐅ, "ᝍ$90ᐅ");
        function ᝍsequenceᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$93ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$95ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍsequenceᐅ, "ᝍsequenceᐅ");
        function ᝍ$93ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 113)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 113;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$93ᐅ, "ᝍ$93ᐅ");
        function ᝍ$95ᐅ() {
          return ᝍ$96ᐅ() || ᝍ$99ᐅ();
        }
        __name(ᝍ$95ᐅ, "ᝍ$95ᐅ");
        function ᝍ$96ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$97ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$97ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$96ᐅ, "ᝍ$96ᐅ");
        function ᝍ$97ᐅ() {
          if (!parseValue(ᝍ$98ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$97ᐅ, "ᝍ$97ᐅ");
        function ᝍ$98ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrefᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$98ᐅ, "ᝍ$98ᐅ");
        function ᝍ$99ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$99ᐅ, "ᝍ$99ᐅ");
        function ᝍstringᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$102ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$104ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍstringᐅ, "ᝍstringᐅ");
        function ᝍ$102ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 103)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$102ᐅ, "ᝍ$102ᐅ");
        function ᝍ$104ᐅ() {
          if (!parseValue(ᝍ$105ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$104ᐅ, "ᝍ$104ᐅ");
        function ᝍ$105ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$107ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "value";
          if (!parseValue(ᝍ$109ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$105ᐅ, "ᝍ$105ᐅ");
        function ᝍ$107ᐅ() {
          OUT[OPOS++] = 67;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$107ᐅ, "ᝍ$107ᐅ");
        function ᝍ$109ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍstrᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$109ᐅ, "ᝍ$109ᐅ");
        function ᝍutf8_charᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$112ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$114ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍutf8_charᐅ, "ᝍutf8_charᐅ");
        function ᝍ$112ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 102)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 56)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 104)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$112ᐅ, "ᝍ$112ᐅ");
        function ᝍ$114ᐅ() {
          if (!parseValue(ᝍ$115ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$114ᐅ, "ᝍ$114ᐅ");
        function ᝍ$115ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍrangeHexᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$115ᐅ, "ᝍ$115ᐅ");
        function ᝍutf8_floatᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$118ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$120ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍutf8_floatᐅ, "ᝍutf8_floatᐅ");
        function ᝍ$118ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 102)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 56)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 102)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 108)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 111)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$118ᐅ, "ᝍ$118ᐅ");
        function ᝍ$120ᐅ() {
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$120ᐅ, "ᝍ$120ᐅ");
        function ᝍutf8_intᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$123ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$125ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍutf8_intᐅ, "ᝍutf8_intᐅ");
        function ᝍ$123ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 102)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 56)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$123ᐅ, "ᝍ$123ᐅ");
        function ᝍ$125ᐅ() {
          if (!parseValue(ᝍ$126ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$125ᐅ, "ᝍ$125ᐅ");
        function ᝍ$126ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$128ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!parseValue(ᝍ$129ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          $assert(typeof OUT[OPOS - 1] === "string");
          if (!parseValue(ᝍ$131ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!parseValue(ᝍ$134ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          $assert(typeof OUT[OPOS - 1] === "string");
          if (!parseValue(ᝍ$136ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$126ᐅ, "ᝍ$126ᐅ");
        function ᝍ$128ᐅ() {
          OUT[OPOS++] = 85;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 73;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 65;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 115;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$128ᐅ, "ᝍ$128ᐅ");
        function ᝍ$129ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍ$130ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$129ᐅ, "ᝍ$129ᐅ");
        function ᝍ$130ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 98)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 98;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$130ᐅ, "ᝍ$130ᐅ");
        function ᝍ$131ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$132ᐅ() && ᝍEQᐅ() && ᝍ$133ᐅ() && ᝍintDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$131ᐅ, "ᝍ$131ᐅ");
        function ᝍ$132ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$132ᐅ, "ᝍ$132ᐅ");
        function ᝍ$133ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$133ᐅ, "ᝍ$133ᐅ");
        function ᝍ$134ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍ$135ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$134ᐅ, "ᝍ$134ᐅ");
        function ᝍ$135ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 103)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 100)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 100;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$135ᐅ, "ᝍ$135ᐅ");
        function ᝍ$136ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$137ᐅ() && ᝍEQᐅ() && ᝍ$138ᐅ() && ᝍboolᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$136ᐅ, "ᝍ$136ᐅ");
        function ᝍ$137ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$137ᐅ, "ᝍ$137ᐅ");
        function ᝍ$138ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$138ᐅ, "ᝍ$138ᐅ");
        function ᝍutf8_stringᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$141ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$143ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍutf8_stringᐅ, "ᝍutf8_stringᐅ");
        function ᝍ$141ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 102)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 56)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 103)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$141ᐅ, "ᝍ$141ᐅ");
        function ᝍ$143ᐅ() {
          if (!parseValue(ᝍ$144ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$143ᐅ, "ᝍ$143ᐅ");
        function ᝍ$144ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$146ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "value";
          if (!parseValue(ᝍ$148ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$144ᐅ, "ᝍ$144ᐅ");
        function ᝍ$146ᐅ() {
          OUT[OPOS++] = 67;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$146ᐅ, "ᝍ$146ᐅ");
        function ᝍ$148ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍstrᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$148ᐅ, "ᝍ$148ᐅ");
        function ᝍutf8_uecharᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$151ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "args";
          if (!parseValue(ᝍ$153ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "meta";
          if (!parseValue(ᝍmetaᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍutf8_uecharᐅ, "ᝍutf8_uecharᐅ");
        function ᝍ$151ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 116)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 102)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 56)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 46)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 117)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 99)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 104)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 114)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$151ᐅ, "ᝍ$151ᐅ");
        function ᝍ$153ᐅ() {
          if (!parseValue(ᝍ$154ᐅ))
            return false;
          TYPE |= LIST;
          return true;
        }
        __name(ᝍ$153ᐅ, "ᝍ$153ᐅ");
        function ᝍ$154ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$156ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!parseValue(ᝍ$157ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          $assert(typeof OUT[OPOS - 1] === "string");
          if (!parseValue(ᝍ$159ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!parseValue(ᝍ$162ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          $assert(typeof OUT[OPOS - 1] === "string");
          if (!parseValue(ᝍ$164ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!parseValue(ᝍ$167ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          $assert(typeof OUT[OPOS - 1] === "string");
          if (!parseValue(ᝍ$169ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$154ᐅ, "ᝍ$154ᐅ");
        function ᝍ$156ᐅ() {
          OUT[OPOS++] = 85;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 85;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 65;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 115;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$156ᐅ, "ᝍ$156ᐅ");
        function ᝍ$157ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍ$158ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$157ᐅ, "ᝍ$157ᐅ");
        function ᝍ$158ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 98)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 115)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 98;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$158ᐅ, "ᝍ$158ᐅ");
        function ᝍ$159ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$160ᐅ() && ᝍEQᐅ() && ᝍ$161ᐅ() && ᝍintDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$159ᐅ, "ᝍ$159ᐅ");
        function ᝍ$160ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$160ᐅ, "ᝍ$160ᐅ");
        function ᝍ$161ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$161ᐅ, "ᝍ$161ᐅ");
        function ᝍ$162ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍ$163ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$162ᐅ, "ᝍ$162ᐅ");
        function ᝍ$163ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 109)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 105)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 108)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 109;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 110;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$163ᐅ, "ᝍ$163ᐅ");
        function ᝍ$164ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$165ᐅ() && ᝍEQᐅ() && ᝍ$166ᐅ() && ᝍintDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$164ᐅ, "ᝍ$164ᐅ");
        function ᝍ$165ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$165ᐅ, "ᝍ$165ᐅ");
        function ᝍ$166ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$166ᐅ, "ᝍ$166ᐅ");
        function ᝍ$167ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHSᐅ() && ᝍ$168ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$167ᐅ, "ᝍ$167ᐅ");
        function ᝍ$168ᐅ() {
          var IPOSₒ = IPOS;
          if (readUtf8Codepoint() !== 109)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 97)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 120)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 108)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 101)
            return IPOS = IPOSₒ, false;
          if (readUtf8Codepoint() !== 110)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = 109;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 120;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 110;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$168ᐅ, "ᝍ$168ᐅ");
        function ᝍ$169ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$170ᐅ() && ᝍEQᐅ() && ᝍ$171ᐅ() && ᝍintDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$169ᐅ, "ᝍ$169ᐅ");
        function ᝍ$170ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$170ᐅ, "ᝍ$170ᐅ");
        function ᝍ$171ᐅ() {
          return ᝍHSᐅ() || true;
        }
        __name(ᝍ$171ᐅ, "ᝍ$171ᐅ");
        function ᝍrangeDecᐅ() {
          return ᝍ$173ᐅ() || ᝍ$179ᐅ() || ᝍ$186ᐅ() || ᝍ$193ᐅ() || ᝍ$201ᐅ();
        }
        __name(ᝍrangeDecᐅ, "ᝍrangeDecᐅ");
        function ᝍ$173ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$175ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍintDecᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$178ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$173ᐅ, "ᝍ$173ᐅ");
        function ᝍ$175ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$175ᐅ, "ᝍ$175ᐅ");
        function ᝍ$178ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍintDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$178ᐅ, "ᝍ$178ᐅ");
        function ᝍ$179ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$181ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍintDecᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$184ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$179ᐅ, "ᝍ$179ᐅ");
        function ᝍ$181ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$181ᐅ, "ᝍ$181ᐅ");
        function ᝍ$184ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍ$185ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$184ᐅ, "ᝍ$184ᐅ");
        function ᝍ$185ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$185ᐅ, "ᝍ$185ᐅ");
        function ᝍ$186ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$188ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍ$190ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$192ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$186ᐅ, "ᝍ$186ᐅ");
        function ᝍ$188ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$188ᐅ, "ᝍ$188ᐅ");
        function ᝍ$190ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$190ᐅ, "ᝍ$190ᐅ");
        function ᝍ$192ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍintDecᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$192ᐅ, "ᝍ$192ᐅ");
        function ᝍ$193ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$195ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍ$197ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$199ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$193ᐅ, "ᝍ$193ᐅ");
        function ᝍ$195ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$195ᐅ, "ᝍ$195ᐅ");
        function ᝍ$197ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$197ᐅ, "ᝍ$197ᐅ");
        function ᝍ$199ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍ$200ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$199ᐅ, "ᝍ$199ᐅ");
        function ᝍ$200ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$200ᐅ, "ᝍ$200ᐅ");
        function ᝍ$201ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$203ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "value";
          if (!parseValue(ᝍintDecᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$201ᐅ, "ᝍ$201ᐅ");
        function ᝍ$203ᐅ() {
          OUT[OPOS++] = 67;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$203ᐅ, "ᝍ$203ᐅ");
        function ᝍrangeHexᐅ() {
          return ᝍ$205ᐅ() || ᝍ$211ᐅ() || ᝍ$218ᐅ() || ᝍ$225ᐅ() || ᝍ$233ᐅ();
        }
        __name(ᝍrangeHexᐅ, "ᝍrangeHexᐅ");
        function ᝍ$205ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$207ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍintHexᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$210ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$205ᐅ, "ᝍ$205ᐅ");
        function ᝍ$207ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$207ᐅ, "ᝍ$207ᐅ");
        function ᝍ$210ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍintHexᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$210ᐅ, "ᝍ$210ᐅ");
        function ᝍ$211ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$213ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍintHexᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$216ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$211ᐅ, "ᝍ$211ᐅ");
        function ᝍ$213ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$213ᐅ, "ᝍ$213ᐅ");
        function ᝍ$216ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍ$217ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$216ᐅ, "ᝍ$216ᐅ");
        function ᝍ$217ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$217ᐅ, "ᝍ$217ᐅ");
        function ᝍ$218ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$220ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍ$222ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$224ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$218ᐅ, "ᝍ$218ᐅ");
        function ᝍ$220ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$220ᐅ, "ᝍ$220ᐅ");
        function ᝍ$222ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$222ᐅ, "ᝍ$222ᐅ");
        function ᝍ$224ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍintHexᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$224ᐅ, "ᝍ$224ᐅ");
        function ᝍ$225ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$227ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "min";
          if (!parseValue(ᝍ$229ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "max";
          if (!parseValue(ᝍ$231ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$225ᐅ, "ᝍ$225ᐅ");
        function ᝍ$227ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 101;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$227ᐅ, "ᝍ$227ᐅ");
        function ᝍ$229ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$229ᐅ, "ᝍ$229ᐅ");
        function ᝍ$231ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍDDᐅ() && ᝍ$232ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$231ᐅ, "ᝍ$231ᐅ");
        function ᝍ$232ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$232ᐅ, "ᝍ$232ᐅ");
        function ᝍ$233ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$235ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "value";
          if (!parseValue(ᝍintHexᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍ$233ᐅ, "ᝍ$233ᐅ");
        function ᝍ$235ᐅ() {
          OUT[OPOS++] = 67;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$235ᐅ, "ᝍ$235ᐅ");
        function ᝍmetaᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "note";
          if (!parseValue(ᝍnoteᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍmetaᐅ, "ᝍmetaᐅ");
        function ᝍnoteᐅ() {
          return ᝍ$238ᐅ() || ᝍ$261ᐅ();
        }
        __name(ᝍnoteᐅ, "ᝍnoteᐅ");
        function ᝍ$238ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$239ᐅ() && ᝍ$240ᐅ() && ᝍ$241ᐅ() && ᝍ$243ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$238ᐅ, "ᝍ$238ᐅ");
        function ᝍ$239ᐅ() {
          return ᝍHS4ᐅ() || true;
        }
        __name(ᝍ$239ᐅ, "ᝍ$239ᐅ");
        function ᝍ$240ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 35)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$240ᐅ, "ᝍ$240ᐅ");
        function ᝍ$241ᐅ() {
          return ᝍ$242ᐅ() || true;
        }
        __name(ᝍ$241ᐅ, "ᝍ$241ᐅ");
        function ᝍ$242ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 32)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$242ᐅ, "ᝍ$242ᐅ");
        function ᝍ$243ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$244ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$244ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$243ᐅ, "ᝍ$243ᐅ");
        function ᝍ$244ᐅ() {
          return ᝍ$245ᐅ() || ᝍ$250ᐅ() || ᝍ$255ᐅ();
        }
        __name(ᝍ$244ᐅ, "ᝍ$244ᐅ");
        function ᝍ$245ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$246ᐅ() && ᝍ$249ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$245ᐅ, "ᝍ$245ᐅ");
        function ᝍ$246ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 110)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$246ᐅ, "ᝍ$246ᐅ");
        function ᝍ$249ᐅ() {
          OUT[OPOS++] = 10;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$249ᐅ, "ᝍ$249ᐅ");
        function ᝍ$250ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$251ᐅ() && ᝍ$254ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$250ᐅ, "ᝍ$250ᐅ");
        function ᝍ$251ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 114)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$251ᐅ, "ᝍ$251ᐅ");
        function ᝍ$254ᐅ() {
          OUT[OPOS++] = 13;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$254ᐅ, "ᝍ$254ᐅ");
        function ᝍ$255ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$256ᐅ() && ᝍ$260ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$255ᐅ, "ᝍ$255ᐅ");
        function ᝍ$256ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$257ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$256ᐅ, "ᝍ$256ᐅ");
        function ᝍ$257ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if (cp !== 13 && cp !== 10)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$257ᐅ, "ᝍ$257ᐅ");
        function ᝍ$260ᐅ() {
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          OUT[OPOS++] = cp;
          TYPE |= cp < 55296 ? STRING_FAST : STRING;
          return true;
        }
        __name(ᝍ$260ᐅ, "ᝍ$260ᐅ");
        function ᝍ$261ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍHS0ᐅ() && ᝍ$262ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$261ᐅ, "ᝍ$261ᐅ");
        function ᝍ$262ᐅ() {
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$262ᐅ, "ᝍ$262ᐅ");
        function ᝍnumᐅ() {
          return ᝍ$263ᐅ() || ᝍ$268ᐅ();
        }
        __name(ᝍnumᐅ, "ᝍnumᐅ");
        function ᝍ$263ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$264ᐅ() && ᝍ$267ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$263ᐅ, "ᝍ$263ᐅ");
        function ᝍ$264ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 48)
            return false;
          if (IN[IPOS + 1] !== 120)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$264ᐅ, "ᝍ$264ᐅ");
        var ᝍ$267ᐅ = createUtf8IntParser({ base: 16, signed: false });
        var ᝍ$268ᐅ = parseUtf8Float;
        function ᝍintDecᐅ() {
          return ᝍ$269ᐅ() || ᝍ$272ᐅ() || ᝍ$277ᐅ();
        }
        __name(ᝍintDecᐅ, "ᝍintDecᐅ");
        function ᝍ$269ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$270ᐅ() && ᝍ$271ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$269ᐅ, "ᝍ$269ᐅ");
        function ᝍ$270ᐅ() {
          return false;
        }
        __name(ᝍ$270ᐅ, "ᝍ$270ᐅ");
        var ᝍ$271ᐅ = createUtf8IntParser({ base: 10, signed: true });
        function ᝍ$272ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$273ᐅ() && ᝍ$276ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$272ᐅ, "ᝍ$272ᐅ");
        function ᝍ$273ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 48)
            return false;
          if (IN[IPOS + 1] !== 120)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$273ᐅ, "ᝍ$273ᐅ");
        var ᝍ$276ᐅ = createUtf8IntParser({ base: 16, signed: false });
        var ᝍ$277ᐅ = createUtf8IntParser({ base: 10, signed: true });
        function ᝍintHexᐅ() {
          return ᝍ$278ᐅ() || ᝍ$283ᐅ();
        }
        __name(ᝍintHexᐅ, "ᝍintHexᐅ");
        function ᝍ$278ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$279ᐅ() && ᝍ$282ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$278ᐅ, "ᝍ$278ᐅ");
        function ᝍ$279ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 48)
            return false;
          if (IN[IPOS + 1] !== 120)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$279ᐅ, "ᝍ$279ᐅ");
        var ᝍ$282ᐅ = createUtf8IntParser({ base: 16, signed: false });
        var ᝍ$283ᐅ = createUtf8IntParser({ base: 10, signed: true });
        function ᝍstrᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$284ᐅ() && ᝍ$285ᐅ() && ᝍ$288ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍstrᐅ, "ᝍstrᐅ");
        function ᝍ$284ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 39)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$284ᐅ, "ᝍ$284ᐅ");
        function ᝍ$285ᐅ() {
          return ᝍ$286ᐅ() || ᝍ$287ᐅ();
        }
        __name(ᝍ$285ᐅ, "ᝍ$285ᐅ");
        function ᝍ$286ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍstrItemᐅ()) {
            return false;
          }
          for (var count = 1; ᝍstrItemᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$286ᐅ, "ᝍ$286ᐅ");
        function ᝍ$287ᐅ() {
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$287ᐅ, "ᝍ$287ᐅ");
        function ᝍ$288ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 39)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$288ᐅ, "ᝍ$288ᐅ");
        function ᝍstrItemᐅ() {
          return ᝍ$289ᐅ() || ᝍ$296ᐅ() || ᝍ$301ᐅ() || ᝍ$306ᐅ() || ᝍ$311ᐅ() || ᝍ$316ᐅ() || ᝍ$321ᐅ() || ᝍ$326ᐅ() || ᝍ$331ᐅ() || ᝍ$336ᐅ();
        }
        __name(ᝍstrItemᐅ, "ᝍstrItemᐅ");
        function ᝍ$289ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$290ᐅ() && ᝍ$295ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$289ᐅ, "ᝍ$289ᐅ");
        function ᝍ$290ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$291ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$290ᐅ, "ᝍ$290ᐅ");
        function ᝍ$291ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if ((cp < 0 || cp > 31) && cp !== 92 && cp !== 39)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$291ᐅ, "ᝍ$291ᐅ");
        function ᝍ$295ᐅ() {
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          OUT[OPOS++] = cp;
          TYPE |= cp < 55296 ? STRING_FAST : STRING;
          return true;
        }
        __name(ᝍ$295ᐅ, "ᝍ$295ᐅ");
        function ᝍ$296ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$297ᐅ() && ᝍ$300ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$296ᐅ, "ᝍ$296ᐅ");
        function ᝍ$297ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 98)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$297ᐅ, "ᝍ$297ᐅ");
        function ᝍ$300ᐅ() {
          OUT[OPOS++] = 8;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$300ᐅ, "ᝍ$300ᐅ");
        function ᝍ$301ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$302ᐅ() && ᝍ$305ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$301ᐅ, "ᝍ$301ᐅ");
        function ᝍ$302ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 102)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$302ᐅ, "ᝍ$302ᐅ");
        function ᝍ$305ᐅ() {
          OUT[OPOS++] = 12;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$305ᐅ, "ᝍ$305ᐅ");
        function ᝍ$306ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$307ᐅ() && ᝍ$310ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$306ᐅ, "ᝍ$306ᐅ");
        function ᝍ$307ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 110)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$307ᐅ, "ᝍ$307ᐅ");
        function ᝍ$310ᐅ() {
          OUT[OPOS++] = 10;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$310ᐅ, "ᝍ$310ᐅ");
        function ᝍ$311ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$312ᐅ() && ᝍ$315ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$311ᐅ, "ᝍ$311ᐅ");
        function ᝍ$312ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 114)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$312ᐅ, "ᝍ$312ᐅ");
        function ᝍ$315ᐅ() {
          OUT[OPOS++] = 13;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$315ᐅ, "ᝍ$315ᐅ");
        function ᝍ$316ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$317ᐅ() && ᝍ$320ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$316ᐅ, "ᝍ$316ᐅ");
        function ᝍ$317ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$317ᐅ, "ᝍ$317ᐅ");
        function ᝍ$320ᐅ() {
          OUT[OPOS++] = 9;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$320ᐅ, "ᝍ$320ᐅ");
        function ᝍ$321ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$322ᐅ() && ᝍ$325ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$321ᐅ, "ᝍ$321ᐅ");
        function ᝍ$322ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 118)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$322ᐅ, "ᝍ$322ᐅ");
        function ᝍ$325ᐅ() {
          OUT[OPOS++] = 11;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$325ᐅ, "ᝍ$325ᐅ");
        function ᝍ$326ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$327ᐅ() && ᝍ$330ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$326ᐅ, "ᝍ$326ᐅ");
        function ᝍ$327ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 92)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$327ᐅ, "ᝍ$327ᐅ");
        function ᝍ$330ᐅ() {
          OUT[OPOS++] = 92;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$330ᐅ, "ᝍ$330ᐅ");
        function ᝍ$331ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$332ᐅ() && ᝍ$335ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$331ᐅ, "ᝍ$331ᐅ");
        function ᝍ$332ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 39)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$332ᐅ, "ᝍ$332ᐅ");
        function ᝍ$335ᐅ() {
          OUT[OPOS++] = 39;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$335ᐅ, "ᝍ$335ᐅ");
        function ᝍ$336ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$337ᐅ() && ᝍ$340ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$336ᐅ, "ᝍ$336ᐅ");
        function ᝍ$337ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          if (IN[IPOS + 1] !== 34)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$337ᐅ, "ᝍ$337ᐅ");
        function ᝍ$340ᐅ() {
          OUT[OPOS++] = 34;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$340ᐅ, "ᝍ$340ᐅ");
        function ᝍboolᐅ() {
          return ᝍ$341ᐅ() || ᝍ$355ᐅ();
        }
        __name(ᝍboolᐅ, "ᝍboolᐅ");
        function ᝍ$341ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$342ᐅ() && ᝍ$347ᐅ() && ᝍ$354ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$341ᐅ, "ᝍ$341ᐅ");
        function ᝍ$342ᐅ() {
          if (IPOS + 4 > ILEN)
            return false;
          if (IN[IPOS] !== 116)
            return false;
          if (IN[IPOS + 1] !== 114)
            return false;
          if (IN[IPOS + 2] !== 117)
            return false;
          if (IN[IPOS + 3] !== 101)
            return false;
          IPOS += 4;
          return true;
        }
        __name(ᝍ$342ᐅ, "ᝍ$342ᐅ");
        function ᝍ$347ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$348ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$347ᐅ, "ᝍ$347ᐅ");
        function ᝍ$348ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$348ᐅ, "ᝍ$348ᐅ");
        function ᝍ$354ᐅ() {
          OUT[OPOS++] = true;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$354ᐅ, "ᝍ$354ᐅ");
        function ᝍ$355ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$356ᐅ() && ᝍ$362ᐅ() && ᝍ$369ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$355ᐅ, "ᝍ$355ᐅ");
        function ᝍ$356ᐅ() {
          if (IPOS + 5 > ILEN)
            return false;
          if (IN[IPOS] !== 102)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 108)
            return false;
          if (IN[IPOS + 3] !== 115)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᝍ$356ᐅ, "ᝍ$356ᐅ");
        function ᝍ$362ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$363ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$362ᐅ, "ᝍ$362ᐅ");
        function ᝍ$363ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$363ᐅ, "ᝍ$363ᐅ");
        function ᝍ$369ᐅ() {
          OUT[OPOS++] = false;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$369ᐅ, "ᝍ$369ᐅ");
        function ᝍnull_ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$370ᐅ() && ᝍ$375ᐅ() && ᝍ$382ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍnull_ᐅ, "ᝍnull_ᐅ");
        function ᝍ$370ᐅ() {
          if (IPOS + 4 > ILEN)
            return false;
          if (IN[IPOS] !== 110)
            return false;
          if (IN[IPOS + 1] !== 117)
            return false;
          if (IN[IPOS + 2] !== 108)
            return false;
          if (IN[IPOS + 3] !== 108)
            return false;
          IPOS += 4;
          return true;
        }
        __name(ᝍ$370ᐅ, "ᝍ$370ᐅ");
        function ᝍ$375ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$376ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$375ᐅ, "ᝍ$375ᐅ");
        function ᝍ$376ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$376ᐅ, "ᝍ$376ᐅ");
        function ᝍ$382ᐅ() {
          OUT[OPOS++] = null;
          TYPE |= SCALAR;
          return true;
        }
        __name(ᝍ$382ᐅ, "ᝍ$382ᐅ");
        function ᝍrefᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          OUT[OPOS++] = "kind";
          if (!parseValue(ᝍ$384ᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          OUT[OPOS++] = "name";
          if (!parseValue(ᝍidᐅ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          TYPE |= RECORD;
          return true;
        }
        __name(ᝍrefᐅ, "ᝍrefᐅ");
        function ᝍ$384ᐅ() {
          OUT[OPOS++] = 82;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 102;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$384ᐅ, "ᝍ$384ᐅ");
        function ᝍidᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$386ᐅ() && ᝍ$391ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍidᐅ, "ᝍidᐅ");
        function ᝍ$386ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36)
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$386ᐅ, "ᝍ$386ᐅ");
        function ᝍ$391ᐅ() {
          while (ᝍ$392ᐅ())
            ;
          return true;
        }
        __name(ᝍ$391ᐅ, "ᝍ$391ᐅ");
        function ᝍ$392ᐅ() {
          var IPOSₒ = IPOS;
          var cp = readUtf8Codepoint();
          if (cp === -1)
            return false;
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return IPOS = IPOSₒ, false;
          OUT[OPOS++] = cp;
          TYPE |= STRING_FAST;
          return true;
        }
        __name(ᝍ$392ᐅ, "ᝍ$392ᐅ");
        function ᝍEQᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 61)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍEQᐅ, "ᝍEQᐅ");
        function ᝍDDᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 46)
            return false;
          if (IN[IPOS + 1] !== 46)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍDDᐅ, "ᝍDDᐅ");
        function ᝍWS0ᐅ() {
          return ᝍ$407ᐅ() || ᝍ$411ᐅ();
        }
        __name(ᝍWS0ᐅ, "ᝍWS0ᐅ");
        function ᝍ$407ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$408ᐅ() && ᝍ$409ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$407ᐅ, "ᝍ$407ᐅ");
        function ᝍ$408ᐅ() {
          return true;
        }
        __name(ᝍ$408ᐅ, "ᝍ$408ᐅ");
        function ᝍ$409ᐅ() {
          while (ᝍ$410ᐅ())
            ;
          return true;
        }
        __name(ᝍ$409ᐅ, "ᝍ$409ᐅ");
        function ᝍ$410ᐅ() {
          return ᝍHSᐅ() || ᝍCOMMENTᐅ() || ᝍEOLᐅ();
        }
        __name(ᝍ$410ᐅ, "ᝍ$410ᐅ");
        function ᝍ$411ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$412ᐅ() && ᝍ$413ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$411ᐅ, "ᝍ$411ᐅ");
        function ᝍ$412ᐅ() {
          return false;
        }
        __name(ᝍ$412ᐅ, "ᝍ$412ᐅ");
        function ᝍ$413ᐅ() {
          return true;
        }
        __name(ᝍ$413ᐅ, "ᝍ$413ᐅ");
        function ᝍHSᐅ() {
          return ᝍ$414ᐅ() || ᝍ$420ᐅ();
        }
        __name(ᝍHSᐅ, "ᝍHSᐅ");
        function ᝍ$414ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$415ᐅ() && ᝍ$416ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$414ᐅ, "ᝍ$414ᐅ");
        function ᝍ$415ᐅ() {
          return true;
        }
        __name(ᝍ$415ᐅ, "ᝍ$415ᐅ");
        function ᝍ$416ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$417ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$417ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$416ᐅ, "ᝍ$416ᐅ");
        function ᝍ$417ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 32 && b !== 9)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$417ᐅ, "ᝍ$417ᐅ");
        function ᝍ$420ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$421ᐅ() && ᝍ$422ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$420ᐅ, "ᝍ$420ᐅ");
        function ᝍ$421ᐅ() {
          return false;
        }
        __name(ᝍ$421ᐅ, "ᝍ$421ᐅ");
        function ᝍ$422ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 32)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$422ᐅ, "ᝍ$422ᐅ");
        function ᝍHS0ᐅ() {
          return ᝍ$423ᐅ() || ᝍ$429ᐅ();
        }
        __name(ᝍHS0ᐅ, "ᝍHS0ᐅ");
        function ᝍ$423ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$424ᐅ() && ᝍ$425ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$423ᐅ, "ᝍ$423ᐅ");
        function ᝍ$424ᐅ() {
          return true;
        }
        __name(ᝍ$424ᐅ, "ᝍ$424ᐅ");
        function ᝍ$425ᐅ() {
          while (ᝍ$426ᐅ())
            ;
          return true;
        }
        __name(ᝍ$425ᐅ, "ᝍ$425ᐅ");
        function ᝍ$426ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 32 && b !== 9)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$426ᐅ, "ᝍ$426ᐅ");
        function ᝍ$429ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$430ᐅ() && ᝍ$431ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$429ᐅ, "ᝍ$429ᐅ");
        function ᝍ$430ᐅ() {
          return false;
        }
        __name(ᝍ$430ᐅ, "ᝍ$430ᐅ");
        function ᝍ$431ᐅ() {
          return true;
        }
        __name(ᝍ$431ᐅ, "ᝍ$431ᐅ");
        function ᝍHS4ᐅ() {
          return ᝍ$432ᐅ() || ᝍ$438ᐅ();
        }
        __name(ᝍHS4ᐅ, "ᝍHS4ᐅ");
        function ᝍ$432ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$433ᐅ() && ᝍ$434ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$432ᐅ, "ᝍ$432ᐅ");
        function ᝍ$433ᐅ() {
          return true;
        }
        __name(ᝍ$433ᐅ, "ᝍ$433ᐅ");
        function ᝍ$434ᐅ() {
          var IPOSₒ = IPOS;
          if (!ᝍ$435ᐅ()) {
            return false;
          }
          for (var count = 1; ᝍ$435ᐅ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᝍ$434ᐅ, "ᝍ$434ᐅ");
        function ᝍ$435ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 32 && b !== 9)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$435ᐅ, "ᝍ$435ᐅ");
        function ᝍ$438ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$439ᐅ() && ᝍ$440ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$438ᐅ, "ᝍ$438ᐅ");
        function ᝍ$439ᐅ() {
          return false;
        }
        __name(ᝍ$439ᐅ, "ᝍ$439ᐅ");
        function ᝍ$440ᐅ() {
          if (IPOS + 4 > ILEN)
            return false;
          if (IN[IPOS] !== 32)
            return false;
          if (IN[IPOS + 1] !== 32)
            return false;
          if (IN[IPOS + 2] !== 32)
            return false;
          if (IN[IPOS + 3] !== 32)
            return false;
          IPOS += 4;
          return true;
        }
        __name(ᝍ$440ᐅ, "ᝍ$440ᐅ");
        function ᝍCOMMENTᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$445ᐅ() && ᝍ$446ᐅ() && ᝍ$448ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍCOMMENTᐅ, "ᝍCOMMENTᐅ");
        function ᝍ$445ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 35)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$445ᐅ, "ᝍ$445ᐅ");
        function ᝍ$446ᐅ() {
          return ᝍ$447ᐅ() || true;
        }
        __name(ᝍ$446ᐅ, "ᝍ$446ᐅ");
        function ᝍ$447ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 32)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$447ᐅ, "ᝍ$447ᐅ");
        function ᝍ$448ᐅ() {
          while (ᝍ$449ᐅ())
            ;
          return true;
        }
        __name(ᝍ$448ᐅ, "ᝍ$448ᐅ");
        function ᝍ$449ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᝍ$450ᐅ() && ᝍ$452ᐅ() && ᝍ$454ᐅ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᝍ$449ᐅ, "ᝍ$449ᐅ");
        function ᝍ$450ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$451ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$450ᐅ, "ᝍ$450ᐅ");
        function ᝍ$451ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 13)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$451ᐅ, "ᝍ$451ᐅ");
        function ᝍ$452ᐅ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᝍ$453ᐅ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᝍ$452ᐅ, "ᝍ$452ᐅ");
        function ᝍ$453ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 10)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$453ᐅ, "ᝍ$453ᐅ");
        function ᝍ$454ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b < 0 || b > 255)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$454ᐅ, "ᝍ$454ᐅ");
        function ᝍEOLᐅ() {
          return ᝍ$455ᐅ() || ᝍ$458ᐅ() || ᝍ$459ᐅ();
        }
        __name(ᝍEOLᐅ, "ᝍEOLᐅ");
        function ᝍ$455ᐅ() {
          if (IPOS + 2 > ILEN)
            return false;
          if (IN[IPOS] !== 13)
            return false;
          if (IN[IPOS + 1] !== 10)
            return false;
          IPOS += 2;
          return true;
        }
        __name(ᝍ$455ᐅ, "ᝍ$455ᐅ");
        function ᝍ$458ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 13)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$458ᐅ, "ᝍ$458ᐅ");
        function ᝍ$459ᐅ() {
          if (IPOS >= ILEN)
            return false;
          var b = IN[IPOS];
          if (b !== 10)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᝍ$459ᐅ, "ᝍ$459ᐅ");
        function ᐊstartᝍ2() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊWS0ᝍ() && ᐊlinesᝍ() && ᐊWS0ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊstartᝍ2, "ᐊstartᝍ");
        function ᐊlinesᝍ() {
          return ᐊ$1ᝍ() || ᐊ$4ᝍ();
        }
        __name(ᐊlinesᝍ, "ᐊlinesᝍ");
        function ᐊ$1ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊlineᝍ() && ᐊ$2ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$1ᝍ, "ᐊ$1ᝍ");
        function ᐊ$2ᝍ() {
          while (ᐊ$3ᝍ())
            ;
          return true;
        }
        __name(ᐊ$2ᝍ, "ᐊ$2ᝍ");
        function ᐊ$3ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊWS0ᝍ() && ᐊlineᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$3ᝍ, "ᐊ$3ᝍ");
        function ᐊ$4ᝍ() {
          if (TYPE !== RECORD)
            return false;
          return true;
        }
        __name(ᐊ$4ᝍ, "ᐊ$4ᝍ");
        function ᐊlineᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$5ᝍ() && ᐊEOLᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊlineᝍ, "ᐊlineᝍ");
        function ᐊ$5ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          if (!printValue(ᐊ$6ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$12ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$5ᝍ, "ᐊ$5ᝍ");
        function ᐊ$6ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$7ᝍ() && ᐊidᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$6ᝍ, "ᐊ$6ᝍ");
        function ᐊ$7ᝍ() {
          return ᐊ$8ᝍ() || true;
        }
        __name(ᐊ$7ᝍ, "ᐊ$7ᝍ");
        function ᐊ$8ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$9ᝍ() && ᐊ$10ᝍ() && ᐊEOLᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$8ᝍ, "ᐊ$8ᝍ");
        function ᐊ$9ᝍ() {
          return true;
        }
        __name(ᐊ$9ᝍ, "ᐊ$9ᝍ");
        function ᐊ$10ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$11ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$10ᝍ, "ᐊ$10ᝍ");
        function ᐊ$11ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 36)
            return false;
          IPOS += 1;
          OUT[OPOS++] = 36;
          return true;
        }
        __name(ᐊ$11ᝍ, "ᐊ$11ᝍ");
        function ᐊ$12ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHS4ᝍ() && ᐊruleᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$12ᝍ, "ᐊ$12ᝍ");
        function ᐊruleᝍ() {
          return ᐊassertionᝍ() || ᐊbyteᝍ() || ᐊchar_ᝍ() || ᐊis_parseᝍ() || ᐊis_printᝍ() || ᐊiterationᝍ() || ᐊlistᝍ() || ᐊnegationᝍ() || ᐊrecordᝍ() || ᐊscalarᝍ() || ᐊselectionᝍ() || ᐊsequenceᝍ() || ᐊstringᝍ() || ᐊutf8_charᝍ() || ᐊutf8_floatᝍ() || ᐊutf8_intᝍ() || ᐊutf8_stringᝍ() || ᐊutf8_uecharᝍ();
        }
        __name(ᐊruleᝍ, "ᐊruleᝍ");
        function ᐊassertionᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$14ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$16ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊassertionᝍ, "ᐊassertionᝍ");
        function ᐊ$14ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 8 >= ILEN)
            return false;
          if (IN[IPOS] !== 97)
            return false;
          if (IN[IPOS + 1] !== 115)
            return false;
          if (IN[IPOS + 2] !== 115)
            return false;
          if (IN[IPOS + 3] !== 101)
            return false;
          if (IN[IPOS + 4] !== 114)
            return false;
          if (IN[IPOS + 5] !== 116)
            return false;
          if (IN[IPOS + 6] !== 105)
            return false;
          if (IN[IPOS + 7] !== 111)
            return false;
          if (IN[IPOS + 8] !== 110)
            return false;
          IPOS += 9;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$14ᝍ, "ᐊ$14ᝍ");
        function ᐊ$16ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$17ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$16ᝍ, "ᐊ$16ᝍ");
        function ᐊ$17ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$17ᝍ, "ᐊ$17ᝍ");
        function ᐊbyteᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$20ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$22ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊbyteᝍ, "ᐊbyteᝍ");
        function ᐊ$20ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 3 >= ILEN)
            return false;
          if (IN[IPOS] !== 98)
            return false;
          if (IN[IPOS + 1] !== 121)
            return false;
          if (IN[IPOS + 2] !== 116)
            return false;
          if (IN[IPOS + 3] !== 101)
            return false;
          IPOS += 4;
          OUT[OPOS++] = 98;
          OUT[OPOS++] = 121;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$20ᝍ, "ᐊ$20ᝍ");
        function ᐊ$22ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$23ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$22ᝍ, "ᐊ$22ᝍ");
        function ᐊ$23ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrangeHexᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$23ᝍ, "ᐊ$23ᝍ");
        function ᐊchar_ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$26ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$28ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊchar_ᝍ, "ᐊchar_ᝍ");
        function ᐊ$26ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 3 >= ILEN)
            return false;
          if (IN[IPOS] !== 99)
            return false;
          if (IN[IPOS + 1] !== 104)
            return false;
          if (IN[IPOS + 2] !== 97)
            return false;
          if (IN[IPOS + 3] !== 114)
            return false;
          IPOS += 4;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          return true;
        }
        __name(ᐊ$26ᝍ, "ᐊ$26ᝍ");
        function ᐊ$28ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$29ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$28ᝍ, "ᐊ$28ᝍ");
        function ᐊ$29ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrangeHexᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$29ᝍ, "ᐊ$29ᝍ");
        function ᐊis_parseᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$32ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$34ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊis_parseᝍ, "ᐊis_parseᝍ");
        function ᐊ$32ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 7 >= ILEN)
            return false;
          if (IN[IPOS] !== 105)
            return false;
          if (IN[IPOS + 1] !== 115)
            return false;
          if (IN[IPOS + 2] !== 46)
            return false;
          if (IN[IPOS + 3] !== 112)
            return false;
          if (IN[IPOS + 4] !== 97)
            return false;
          if (IN[IPOS + 5] !== 114)
            return false;
          if (IN[IPOS + 6] !== 115)
            return false;
          if (IN[IPOS + 7] !== 101)
            return false;
          IPOS += 8;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 112;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$32ᝍ, "ᐊ$32ᝍ");
        function ᐊ$34ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$34ᝍ, "ᐊ$34ᝍ");
        function ᐊis_printᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$37ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$39ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊis_printᝍ, "ᐊis_printᝍ");
        function ᐊ$37ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 7 >= ILEN)
            return false;
          if (IN[IPOS] !== 105)
            return false;
          if (IN[IPOS + 1] !== 115)
            return false;
          if (IN[IPOS + 2] !== 46)
            return false;
          if (IN[IPOS + 3] !== 112)
            return false;
          if (IN[IPOS + 4] !== 114)
            return false;
          if (IN[IPOS + 5] !== 105)
            return false;
          if (IN[IPOS + 6] !== 110)
            return false;
          if (IN[IPOS + 7] !== 116)
            return false;
          IPOS += 8;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 112;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 116;
          return true;
        }
        __name(ᐊ$37ᝍ, "ᐊ$37ᝍ");
        function ᐊ$39ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$39ᝍ, "ᐊ$39ᝍ");
        function ᐊiterationᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$42ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$44ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊiterationᝍ, "ᐊiterationᝍ");
        function ᐊ$42ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 8 >= ILEN)
            return false;
          if (IN[IPOS] !== 105)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 101)
            return false;
          if (IN[IPOS + 3] !== 114)
            return false;
          if (IN[IPOS + 4] !== 97)
            return false;
          if (IN[IPOS + 5] !== 116)
            return false;
          if (IN[IPOS + 6] !== 105)
            return false;
          if (IN[IPOS + 7] !== 111)
            return false;
          if (IN[IPOS + 8] !== 110)
            return false;
          IPOS += 9;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$42ᝍ, "ᐊ$42ᝍ");
        function ᐊ$44ᝍ() {
          if (TYPE !== LIST)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          if (!printValue(ᐊ$45ᝍ))
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          if (!printValue(ᐊ$46ᝍ))
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          return true;
        }
        __name(ᐊ$44ᝍ, "ᐊ$44ᝍ");
        function ᐊ$45ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrangeDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$45ᝍ, "ᐊ$45ᝍ");
        function ᐊ$46ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$46ᝍ, "ᐊ$46ᝍ");
        function ᐊlistᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$49ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$51ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊlistᝍ, "ᐊlistᝍ");
        function ᐊ$49ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 3 >= ILEN)
            return false;
          if (IN[IPOS] !== 108)
            return false;
          if (IN[IPOS + 1] !== 105)
            return false;
          if (IN[IPOS + 2] !== 115)
            return false;
          if (IN[IPOS + 3] !== 116)
            return false;
          IPOS += 4;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          return true;
        }
        __name(ᐊ$49ᝍ, "ᐊ$49ᝍ");
        function ᐊ$51ᝍ() {
          return ᐊ$52ᝍ() || ᐊ$55ᝍ();
        }
        __name(ᐊ$51ᝍ, "ᐊ$51ᝍ");
        function ᐊ$52ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$53ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$53ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$52ᝍ, "ᐊ$52ᝍ");
        function ᐊ$53ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$54ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$53ᝍ, "ᐊ$53ᝍ");
        function ᐊ$54ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$54ᝍ, "ᐊ$54ᝍ");
        function ᐊ$55ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$55ᝍ, "ᐊ$55ᝍ");
        function ᐊnegationᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$58ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$60ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊnegationᝍ, "ᐊnegationᝍ");
        function ᐊ$58ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 7 >= ILEN)
            return false;
          if (IN[IPOS] !== 110)
            return false;
          if (IN[IPOS + 1] !== 101)
            return false;
          if (IN[IPOS + 2] !== 103)
            return false;
          if (IN[IPOS + 3] !== 97)
            return false;
          if (IN[IPOS + 4] !== 116)
            return false;
          if (IN[IPOS + 5] !== 105)
            return false;
          if (IN[IPOS + 6] !== 111)
            return false;
          if (IN[IPOS + 7] !== 110)
            return false;
          IPOS += 8;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$58ᝍ, "ᐊ$58ᝍ");
        function ᐊ$60ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$61ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$60ᝍ, "ᐊ$60ᝍ");
        function ᐊ$61ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$61ᝍ, "ᐊ$61ᝍ");
        function ᐊrecordᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$64ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$66ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊrecordᝍ, "ᐊrecordᝍ");
        function ᐊ$64ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 5 >= ILEN)
            return false;
          if (IN[IPOS] !== 114)
            return false;
          if (IN[IPOS + 1] !== 101)
            return false;
          if (IN[IPOS + 2] !== 99)
            return false;
          if (IN[IPOS + 3] !== 111)
            return false;
          if (IN[IPOS + 4] !== 114)
            return false;
          if (IN[IPOS + 5] !== 100)
            return false;
          IPOS += 6;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 100;
          return true;
        }
        __name(ᐊ$64ᝍ, "ᐊ$64ᝍ");
        function ᐊ$66ᝍ() {
          return ᐊ$67ᝍ() || ᐊ$70ᝍ();
        }
        __name(ᐊ$66ᝍ, "ᐊ$66ᝍ");
        function ᐊ$67ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$68ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$68ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$67ᝍ, "ᐊ$67ᝍ");
        function ᐊ$68ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$69ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$68ᝍ, "ᐊ$68ᝍ");
        function ᐊ$69ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$69ᝍ, "ᐊ$69ᝍ");
        function ᐊ$70ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$70ᝍ, "ᐊ$70ᝍ");
        function ᐊscalarᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$73ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$75ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊscalarᝍ, "ᐊscalarᝍ");
        function ᐊ$73ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 5 >= ILEN)
            return false;
          if (IN[IPOS] !== 115)
            return false;
          if (IN[IPOS + 1] !== 99)
            return false;
          if (IN[IPOS + 2] !== 97)
            return false;
          if (IN[IPOS + 3] !== 108)
            return false;
          if (IN[IPOS + 4] !== 97)
            return false;
          if (IN[IPOS + 5] !== 114)
            return false;
          IPOS += 6;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          return true;
        }
        __name(ᐊ$73ᝍ, "ᐊ$73ᝍ");
        function ᐊ$75ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$76ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$75ᝍ, "ᐊ$75ᝍ");
        function ᐊ$76ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$78ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "value"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$80ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$76ᝍ, "ᐊ$76ᝍ");
        function ᐊ$78ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 67)
            return false;
          if (IN[IPOS + 1] !== 111)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 115)
            return false;
          if (IN[IPOS + 4] !== 116)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$78ᝍ, "ᐊ$78ᝍ");
        function ᐊ$80ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊ$81ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$80ᝍ, "ᐊ$80ᝍ");
        function ᐊ$81ᝍ() {
          return ᐊnumᝍ() || ᐊboolᝍ() || ᐊnull_ᝍ();
        }
        __name(ᐊ$81ᝍ, "ᐊ$81ᝍ");
        function ᐊselectionᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$84ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$86ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊselectionᝍ, "ᐊselectionᝍ");
        function ᐊ$84ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 8 >= ILEN)
            return false;
          if (IN[IPOS] !== 115)
            return false;
          if (IN[IPOS + 1] !== 101)
            return false;
          if (IN[IPOS + 2] !== 108)
            return false;
          if (IN[IPOS + 3] !== 101)
            return false;
          if (IN[IPOS + 4] !== 99)
            return false;
          if (IN[IPOS + 5] !== 116)
            return false;
          if (IN[IPOS + 6] !== 105)
            return false;
          if (IN[IPOS + 7] !== 111)
            return false;
          if (IN[IPOS + 8] !== 110)
            return false;
          IPOS += 9;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$84ᝍ, "ᐊ$84ᝍ");
        function ᐊ$86ᝍ() {
          return ᐊ$87ᝍ() || ᐊ$90ᝍ();
        }
        __name(ᐊ$86ᝍ, "ᐊ$86ᝍ");
        function ᐊ$87ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$88ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$88ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$87ᝍ, "ᐊ$87ᝍ");
        function ᐊ$88ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$89ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$88ᝍ, "ᐊ$88ᝍ");
        function ᐊ$89ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$89ᝍ, "ᐊ$89ᝍ");
        function ᐊ$90ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$90ᝍ, "ᐊ$90ᝍ");
        function ᐊsequenceᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$93ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$95ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊsequenceᝍ, "ᐊsequenceᝍ");
        function ᐊ$93ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 7 >= ILEN)
            return false;
          if (IN[IPOS] !== 115)
            return false;
          if (IN[IPOS + 1] !== 101)
            return false;
          if (IN[IPOS + 2] !== 113)
            return false;
          if (IN[IPOS + 3] !== 117)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          if (IN[IPOS + 5] !== 110)
            return false;
          if (IN[IPOS + 6] !== 99)
            return false;
          if (IN[IPOS + 7] !== 101)
            return false;
          IPOS += 8;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 113;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$93ᝍ, "ᐊ$93ᝍ");
        function ᐊ$95ᝍ() {
          return ᐊ$96ᝍ() || ᐊ$99ᝍ();
        }
        __name(ᐊ$95ᝍ, "ᐊ$95ᝍ");
        function ᐊ$96ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$97ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$97ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$96ᝍ, "ᐊ$96ᝍ");
        function ᐊ$97ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$98ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$97ᝍ, "ᐊ$97ᝍ");
        function ᐊ$98ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrefᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$98ᝍ, "ᐊ$98ᝍ");
        function ᐊ$99ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$99ᝍ, "ᐊ$99ᝍ");
        function ᐊstringᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$102ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$104ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊstringᝍ, "ᐊstringᝍ");
        function ᐊ$102ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 5 >= ILEN)
            return false;
          if (IN[IPOS] !== 115)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 114)
            return false;
          if (IN[IPOS + 3] !== 105)
            return false;
          if (IN[IPOS + 4] !== 110)
            return false;
          if (IN[IPOS + 5] !== 103)
            return false;
          IPOS += 6;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          return true;
        }
        __name(ᐊ$102ᝍ, "ᐊ$102ᝍ");
        function ᐊ$104ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$105ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$104ᝍ, "ᐊ$104ᝍ");
        function ᐊ$105ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$107ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "value"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$109ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$105ᝍ, "ᐊ$105ᝍ");
        function ᐊ$107ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 67)
            return false;
          if (IN[IPOS + 1] !== 111)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 115)
            return false;
          if (IN[IPOS + 4] !== 116)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$107ᝍ, "ᐊ$107ᝍ");
        function ᐊ$109ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊstrᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$109ᝍ, "ᐊ$109ᝍ");
        function ᐊutf8_charᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$112ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$114ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊutf8_charᝍ, "ᐊutf8_charᝍ");
        function ᐊ$112ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 8 >= ILEN)
            return false;
          if (IN[IPOS] !== 117)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 46)
            return false;
          if (IN[IPOS + 5] !== 99)
            return false;
          if (IN[IPOS + 6] !== 104)
            return false;
          if (IN[IPOS + 7] !== 97)
            return false;
          if (IN[IPOS + 8] !== 114)
            return false;
          IPOS += 9;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          return true;
        }
        __name(ᐊ$112ᝍ, "ᐊ$112ᝍ");
        function ᐊ$114ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$115ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$114ᝍ, "ᐊ$114ᝍ");
        function ᐊ$115ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊrangeHexᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$115ᝍ, "ᐊ$115ᝍ");
        function ᐊutf8_floatᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$118ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$120ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊutf8_floatᝍ, "ᐊutf8_floatᝍ");
        function ᐊ$118ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 9 >= ILEN)
            return false;
          if (IN[IPOS] !== 117)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 46)
            return false;
          if (IN[IPOS + 5] !== 102)
            return false;
          if (IN[IPOS + 6] !== 108)
            return false;
          if (IN[IPOS + 7] !== 111)
            return false;
          if (IN[IPOS + 8] !== 97)
            return false;
          if (IN[IPOS + 9] !== 116)
            return false;
          IPOS += 10;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 111;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 116;
          return true;
        }
        __name(ᐊ$118ᝍ, "ᐊ$118ᝍ");
        function ᐊ$120ᝍ() {
          if (TYPE !== LIST)
            return false;
          return true;
        }
        __name(ᐊ$120ᝍ, "ᐊ$120ᝍ");
        function ᐊutf8_intᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$123ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$125ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊutf8_intᝍ, "ᐊutf8_intᝍ");
        function ᐊ$123ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 7 >= ILEN)
            return false;
          if (IN[IPOS] !== 117)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 46)
            return false;
          if (IN[IPOS + 5] !== 105)
            return false;
          if (IN[IPOS + 6] !== 110)
            return false;
          if (IN[IPOS + 7] !== 116)
            return false;
          IPOS += 8;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 116;
          return true;
        }
        __name(ᐊ$123ᝍ, "ᐊ$123ᝍ");
        function ᐊ$125ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$126ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$125ᝍ, "ᐊ$125ᝍ");
        function ᐊ$126ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$128ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$129ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$131ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$134ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$136ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$126ᝍ, "ᐊ$126ᝍ");
        function ᐊ$128ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 10 >= ILEN)
            return false;
          if (IN[IPOS] !== 85)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 73)
            return false;
          if (IN[IPOS + 5] !== 110)
            return false;
          if (IN[IPOS + 6] !== 116)
            return false;
          if (IN[IPOS + 7] !== 65)
            return false;
          if (IN[IPOS + 8] !== 114)
            return false;
          if (IN[IPOS + 9] !== 103)
            return false;
          if (IN[IPOS + 10] !== 115)
            return false;
          IPOS += 11;
          return true;
        }
        __name(ᐊ$128ᝍ, "ᐊ$128ᝍ");
        function ᐊ$129ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊ$130ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$129ᝍ, "ᐊ$129ᝍ");
        function ᐊ$130ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 3 >= ILEN)
            return false;
          if (IN[IPOS] !== 98)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 115)
            return false;
          if (IN[IPOS + 3] !== 101)
            return false;
          IPOS += 4;
          OUT[OPOS++] = 98;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$130ᝍ, "ᐊ$130ᝍ");
        function ᐊ$131ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$132ᝍ() && ᐊEQᝍ() && ᐊ$133ᝍ() && ᐊintDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$131ᝍ, "ᐊ$131ᝍ");
        function ᐊ$132ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$132ᝍ, "ᐊ$132ᝍ");
        function ᐊ$133ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$133ᝍ, "ᐊ$133ᝍ");
        function ᐊ$134ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊ$135ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$134ᝍ, "ᐊ$134ᝍ");
        function ᐊ$135ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 5 >= ILEN)
            return false;
          if (IN[IPOS] !== 115)
            return false;
          if (IN[IPOS + 1] !== 105)
            return false;
          if (IN[IPOS + 2] !== 103)
            return false;
          if (IN[IPOS + 3] !== 110)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          if (IN[IPOS + 5] !== 100)
            return false;
          IPOS += 6;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 103;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 100;
          return true;
        }
        __name(ᐊ$135ᝍ, "ᐊ$135ᝍ");
        function ᐊ$136ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$137ᝍ() && ᐊEQᝍ() && ᐊ$138ᝍ() && ᐊboolᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$136ᝍ, "ᐊ$136ᝍ");
        function ᐊ$137ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$137ᝍ, "ᐊ$137ᝍ");
        function ᐊ$138ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$138ᝍ, "ᐊ$138ᝍ");
        function ᐊutf8_stringᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$141ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$143ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊutf8_stringᝍ, "ᐊutf8_stringᝍ");
        function ᐊ$141ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 10 >= ILEN)
            return false;
          if (IN[IPOS] !== 117)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 46)
            return false;
          if (IN[IPOS + 5] !== 115)
            return false;
          if (IN[IPOS + 6] !== 116)
            return false;
          if (IN[IPOS + 7] !== 114)
            return false;
          if (IN[IPOS + 8] !== 105)
            return false;
          if (IN[IPOS + 9] !== 110)
            return false;
          if (IN[IPOS + 10] !== 103)
            return false;
          IPOS += 11;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 103;
          return true;
        }
        __name(ᐊ$141ᝍ, "ᐊ$141ᝍ");
        function ᐊ$143ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$144ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$143ᝍ, "ᐊ$143ᝍ");
        function ᐊ$144ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$146ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "value"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$148ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$144ᝍ, "ᐊ$144ᝍ");
        function ᐊ$146ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 67)
            return false;
          if (IN[IPOS + 1] !== 111)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 115)
            return false;
          if (IN[IPOS + 4] !== 116)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$146ᝍ, "ᐊ$146ᝍ");
        function ᐊ$148ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊstrᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$148ᝍ, "ᐊ$148ᝍ");
        function ᐊutf8_uecharᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$151ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "args"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$153ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "meta"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊmetaᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊutf8_uecharᝍ, "ᐊutf8_uecharᝍ");
        function ᐊ$151ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 10 >= ILEN)
            return false;
          if (IN[IPOS] !== 117)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 46)
            return false;
          if (IN[IPOS + 5] !== 117)
            return false;
          if (IN[IPOS + 6] !== 101)
            return false;
          if (IN[IPOS + 7] !== 99)
            return false;
          if (IN[IPOS + 8] !== 104)
            return false;
          if (IN[IPOS + 9] !== 97)
            return false;
          if (IN[IPOS + 10] !== 114)
            return false;
          IPOS += 11;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 56;
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 99;
          OUT[OPOS++] = 104;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 114;
          return true;
        }
        __name(ᐊ$151ᝍ, "ᐊ$151ᝍ");
        function ᐊ$153ᝍ() {
          if (TYPE !== LIST)
            return false;
          if (!printValue(ᐊ$154ᝍ))
            return false;
          return true;
        }
        __name(ᐊ$153ᝍ, "ᐊ$153ᝍ");
        function ᐊ$154ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$156ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$157ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$159ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$162ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$164ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$167ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          if (!printValue(ᐊ$169ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$154ᝍ, "ᐊ$154ᝍ");
        function ᐊ$156ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 13 >= ILEN)
            return false;
          if (IN[IPOS] !== 85)
            return false;
          if (IN[IPOS + 1] !== 116)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          if (IN[IPOS + 3] !== 56)
            return false;
          if (IN[IPOS + 4] !== 85)
            return false;
          if (IN[IPOS + 5] !== 101)
            return false;
          if (IN[IPOS + 6] !== 99)
            return false;
          if (IN[IPOS + 7] !== 104)
            return false;
          if (IN[IPOS + 8] !== 97)
            return false;
          if (IN[IPOS + 9] !== 114)
            return false;
          if (IN[IPOS + 10] !== 65)
            return false;
          if (IN[IPOS + 11] !== 114)
            return false;
          if (IN[IPOS + 12] !== 103)
            return false;
          if (IN[IPOS + 13] !== 115)
            return false;
          IPOS += 14;
          return true;
        }
        __name(ᐊ$156ᝍ, "ᐊ$156ᝍ");
        function ᐊ$157ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊ$158ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$157ᝍ, "ᐊ$157ᝍ");
        function ᐊ$158ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 3 >= ILEN)
            return false;
          if (IN[IPOS] !== 98)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 115)
            return false;
          if (IN[IPOS + 3] !== 101)
            return false;
          IPOS += 4;
          OUT[OPOS++] = 98;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$158ᝍ, "ᐊ$158ᝍ");
        function ᐊ$159ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$160ᝍ() && ᐊEQᝍ() && ᐊ$161ᝍ() && ᐊintDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$159ᝍ, "ᐊ$159ᝍ");
        function ᐊ$160ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$160ᝍ, "ᐊ$160ᝍ");
        function ᐊ$161ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$161ᝍ, "ᐊ$161ᝍ");
        function ᐊ$162ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊ$163ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$162ᝍ, "ᐊ$162ᝍ");
        function ᐊ$163ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 5 >= ILEN)
            return false;
          if (IN[IPOS] !== 109)
            return false;
          if (IN[IPOS + 1] !== 105)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 108)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          if (IN[IPOS + 5] !== 110)
            return false;
          IPOS += 6;
          OUT[OPOS++] = 109;
          OUT[OPOS++] = 105;
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$163ᝍ, "ᐊ$163ᝍ");
        function ᐊ$164ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$165ᝍ() && ᐊEQᝍ() && ᐊ$166ᝍ() && ᐊintDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$164ᝍ, "ᐊ$164ᝍ");
        function ᐊ$165ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$165ᝍ, "ᐊ$165ᝍ");
        function ᐊ$166ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$166ᝍ, "ᐊ$166ᝍ");
        function ᐊ$167ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHSᝍ() && ᐊ$168ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$167ᝍ, "ᐊ$167ᝍ");
        function ᐊ$168ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 5 >= ILEN)
            return false;
          if (IN[IPOS] !== 109)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 120)
            return false;
          if (IN[IPOS + 3] !== 108)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          if (IN[IPOS + 5] !== 110)
            return false;
          IPOS += 6;
          OUT[OPOS++] = 109;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 120;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 101;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$168ᝍ, "ᐊ$168ᝍ");
        function ᐊ$169ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$170ᝍ() && ᐊEQᝍ() && ᐊ$171ᝍ() && ᐊintDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$169ᝍ, "ᐊ$169ᝍ");
        function ᐊ$170ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$170ᝍ, "ᐊ$170ᝍ");
        function ᐊ$171ᝍ() {
          return ᐊHSᝍ() || true;
        }
        __name(ᐊ$171ᝍ, "ᐊ$171ᝍ");
        function ᐊrangeDecᝍ() {
          return ᐊ$173ᝍ() || ᐊ$179ᝍ() || ᐊ$186ᝍ() || ᐊ$193ᝍ() || ᐊ$201ᝍ();
        }
        __name(ᐊrangeDecᝍ, "ᐊrangeDecᝍ");
        function ᐊ$173ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$175ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊintDecᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$178ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$173ᝍ, "ᐊ$173ᝍ");
        function ᐊ$175ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$175ᝍ, "ᐊ$175ᝍ");
        function ᐊ$178ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊintDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$178ᝍ, "ᐊ$178ᝍ");
        function ᐊ$179ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$181ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊintDecᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$184ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$179ᝍ, "ᐊ$179ᝍ");
        function ᐊ$181ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$181ᝍ, "ᐊ$181ᝍ");
        function ᐊ$184ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊ$185ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$184ᝍ, "ᐊ$184ᝍ");
        function ᐊ$185ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$185ᝍ, "ᐊ$185ᝍ");
        function ᐊ$186ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$188ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$190ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$192ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$186ᝍ, "ᐊ$186ᝍ");
        function ᐊ$188ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$188ᝍ, "ᐊ$188ᝍ");
        function ᐊ$190ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$190ᝍ, "ᐊ$190ᝍ");
        function ᐊ$192ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊintDecᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$192ᝍ, "ᐊ$192ᝍ");
        function ᐊ$193ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$195ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$197ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$199ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$193ᝍ, "ᐊ$193ᝍ");
        function ᐊ$195ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$195ᝍ, "ᐊ$195ᝍ");
        function ᐊ$197ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$197ᝍ, "ᐊ$197ᝍ");
        function ᐊ$199ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊ$200ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$199ᝍ, "ᐊ$199ᝍ");
        function ᐊ$200ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$200ᝍ, "ᐊ$200ᝍ");
        function ᐊ$201ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$203ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "value"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊintDecᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$201ᝍ, "ᐊ$201ᝍ");
        function ᐊ$203ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 67)
            return false;
          if (IN[IPOS + 1] !== 111)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 115)
            return false;
          if (IN[IPOS + 4] !== 116)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$203ᝍ, "ᐊ$203ᝍ");
        function ᐊrangeHexᝍ() {
          return ᐊ$205ᝍ() || ᐊ$211ᝍ() || ᐊ$218ᝍ() || ᐊ$225ᝍ() || ᐊ$233ᝍ();
        }
        __name(ᐊrangeHexᝍ, "ᐊrangeHexᝍ");
        function ᐊ$205ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$207ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊintHexᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$210ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$205ᝍ, "ᐊ$205ᝍ");
        function ᐊ$207ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$207ᝍ, "ᐊ$207ᝍ");
        function ᐊ$210ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊintHexᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$210ᝍ, "ᐊ$210ᝍ");
        function ᐊ$211ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$213ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊintHexᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$216ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$211ᝍ, "ᐊ$211ᝍ");
        function ᐊ$213ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$213ᝍ, "ᐊ$213ᝍ");
        function ᐊ$216ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊ$217ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$216ᝍ, "ᐊ$216ᝍ");
        function ᐊ$217ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$217ᝍ, "ᐊ$217ᝍ");
        function ᐊ$218ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$220ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$222ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$224ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$218ᝍ, "ᐊ$218ᝍ");
        function ᐊ$220ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$220ᝍ, "ᐊ$220ᝍ");
        function ᐊ$222ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$222ᝍ, "ᐊ$222ᝍ");
        function ᐊ$224ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊintHexᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$224ᝍ, "ᐊ$224ᝍ");
        function ᐊ$225ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$227ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "min"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$229ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "max"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$231ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$225ᝍ, "ᐊ$225ᝍ");
        function ᐊ$227ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 97)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 103)
            return false;
          if (IN[IPOS + 4] !== 101)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$227ᝍ, "ᐊ$227ᝍ");
        function ᐊ$229ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$229ᝍ, "ᐊ$229ᝍ");
        function ᐊ$231ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊDDᝍ() && ᐊ$232ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$231ᝍ, "ᐊ$231ᝍ");
        function ᐊ$232ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$232ᝍ, "ᐊ$232ᝍ");
        function ᐊ$233ᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$235ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "value"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊintHexᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊ$233ᝍ, "ᐊ$233ᝍ");
        function ᐊ$235ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 4 >= ILEN)
            return false;
          if (IN[IPOS] !== 67)
            return false;
          if (IN[IPOS + 1] !== 111)
            return false;
          if (IN[IPOS + 2] !== 110)
            return false;
          if (IN[IPOS + 3] !== 115)
            return false;
          if (IN[IPOS + 4] !== 116)
            return false;
          IPOS += 5;
          return true;
        }
        __name(ᐊ$235ᝍ, "ᐊ$235ᝍ");
        function ᐊmetaᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "note"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊnoteᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊmetaᝍ, "ᐊmetaᝍ");
        function ᐊnoteᝍ() {
          return ᐊ$238ᝍ() || ᐊ$261ᝍ();
        }
        __name(ᐊnoteᝍ, "ᐊnoteᝍ");
        function ᐊ$238ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$239ᝍ() && ᐊ$240ᝍ() && ᐊ$241ᝍ() && ᐊ$243ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$238ᝍ, "ᐊ$238ᝍ");
        function ᐊ$239ᝍ() {
          return ᐊHS4ᝍ() || true;
        }
        __name(ᐊ$239ᝍ, "ᐊ$239ᝍ");
        function ᐊ$240ᝍ() {
          OUT[OPOS++] = 35;
          return true;
        }
        __name(ᐊ$240ᝍ, "ᐊ$240ᝍ");
        function ᐊ$241ᝍ() {
          return ᐊ$242ᝍ() || true;
        }
        __name(ᐊ$241ᝍ, "ᐊ$241ᝍ");
        function ᐊ$242ᝍ() {
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$242ᝍ, "ᐊ$242ᝍ");
        function ᐊ$243ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$244ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$244ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$243ᝍ, "ᐊ$243ᝍ");
        function ᐊ$244ᝍ() {
          return ᐊ$245ᝍ() || ᐊ$250ᝍ() || ᐊ$255ᝍ();
        }
        __name(ᐊ$244ᝍ, "ᐊ$244ᝍ");
        function ᐊ$245ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$246ᝍ() && ᐊ$249ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$245ᝍ, "ᐊ$245ᝍ");
        function ᐊ$246ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$246ᝍ, "ᐊ$246ᝍ");
        function ᐊ$249ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 10)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$249ᝍ, "ᐊ$249ᝍ");
        function ᐊ$250ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$251ᝍ() && ᐊ$254ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$250ᝍ, "ᐊ$250ᝍ");
        function ᐊ$251ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 114;
          return true;
        }
        __name(ᐊ$251ᝍ, "ᐊ$251ᝍ");
        function ᐊ$254ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 13)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$254ᝍ, "ᐊ$254ᝍ");
        function ᐊ$255ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$256ᝍ() && ᐊ$260ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$255ᝍ, "ᐊ$255ᝍ");
        function ᐊ$256ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$257ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$256ᝍ, "ᐊ$256ᝍ");
        function ᐊ$257ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if (cp !== 13 && cp !== 10)
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$257ᝍ, "ᐊ$257ᝍ");
        function ᐊ$260ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          writeUtf8Codepoint(cp);
          IPOS += 1;
          return true;
        }
        __name(ᐊ$260ᝍ, "ᐊ$260ᝍ");
        function ᐊ$261ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊHS0ᝍ() && ᐊ$262ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$261ᝍ, "ᐊ$261ᝍ");
        function ᐊ$262ᝍ() {
          if (TYPE !== STRING)
            return false;
          return true;
        }
        __name(ᐊ$262ᝍ, "ᐊ$262ᝍ");
        function ᐊnumᝍ() {
          return ᐊ$263ᝍ() || ᐊ$268ᝍ();
        }
        __name(ᐊnumᝍ, "ᐊnumᝍ");
        function ᐊ$263ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$264ᝍ() && ᐊ$267ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$263ᝍ, "ᐊ$263ᝍ");
        function ᐊ$264ᝍ() {
          OUT[OPOS++] = 48;
          OUT[OPOS++] = 120;
          return true;
        }
        __name(ᐊ$264ᝍ, "ᐊ$264ᝍ");
        var ᐊ$267ᝍ = createUtf8IntPrinter({ base: 16, signed: false });
        var ᐊ$268ᝍ = printUtf8Float;
        function ᐊintDecᝍ() {
          return ᐊ$269ᝍ() || ᐊ$272ᝍ() || ᐊ$277ᝍ();
        }
        __name(ᐊintDecᝍ, "ᐊintDecᝍ");
        function ᐊ$269ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$270ᝍ() && ᐊ$271ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$269ᝍ, "ᐊ$269ᝍ");
        function ᐊ$270ᝍ() {
          return true;
        }
        __name(ᐊ$270ᝍ, "ᐊ$270ᝍ");
        var ᐊ$271ᝍ = createUtf8IntPrinter({ base: 10, signed: true });
        function ᐊ$272ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$273ᝍ() && ᐊ$276ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$272ᝍ, "ᐊ$272ᝍ");
        function ᐊ$273ᝍ() {
          OUT[OPOS++] = 48;
          OUT[OPOS++] = 120;
          return true;
        }
        __name(ᐊ$273ᝍ, "ᐊ$273ᝍ");
        var ᐊ$276ᝍ = createUtf8IntPrinter({ base: 16, signed: false });
        var ᐊ$277ᝍ = createUtf8IntPrinter({ base: 10, signed: true });
        function ᐊintHexᝍ() {
          return ᐊ$278ᝍ() || ᐊ$283ᝍ();
        }
        __name(ᐊintHexᝍ, "ᐊintHexᝍ");
        function ᐊ$278ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$279ᝍ() && ᐊ$282ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$278ᝍ, "ᐊ$278ᝍ");
        function ᐊ$279ᝍ() {
          OUT[OPOS++] = 48;
          OUT[OPOS++] = 120;
          return true;
        }
        __name(ᐊ$279ᝍ, "ᐊ$279ᝍ");
        var ᐊ$282ᝍ = createUtf8IntPrinter({ base: 16, signed: false });
        var ᐊ$283ᝍ = createUtf8IntPrinter({ base: 10, signed: true });
        function ᐊstrᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$284ᝍ() && ᐊ$285ᝍ() && ᐊ$288ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊstrᝍ, "ᐊstrᝍ");
        function ᐊ$284ᝍ() {
          OUT[OPOS++] = 39;
          return true;
        }
        __name(ᐊ$284ᝍ, "ᐊ$284ᝍ");
        function ᐊ$285ᝍ() {
          return ᐊ$286ᝍ() || ᐊ$287ᝍ();
        }
        __name(ᐊ$285ᝍ, "ᐊ$285ᝍ");
        function ᐊ$286ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊstrItemᝍ()) {
            return false;
          }
          for (var count = 1; ᐊstrItemᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$286ᝍ, "ᐊ$286ᝍ");
        function ᐊ$287ᝍ() {
          if (TYPE !== STRING)
            return false;
          return true;
        }
        __name(ᐊ$287ᝍ, "ᐊ$287ᝍ");
        function ᐊ$288ᝍ() {
          OUT[OPOS++] = 39;
          return true;
        }
        __name(ᐊ$288ᝍ, "ᐊ$288ᝍ");
        function ᐊstrItemᝍ() {
          return ᐊ$289ᝍ() || ᐊ$296ᝍ() || ᐊ$301ᝍ() || ᐊ$306ᝍ() || ᐊ$311ᝍ() || ᐊ$316ᝍ() || ᐊ$321ᝍ() || ᐊ$326ᝍ() || ᐊ$331ᝍ() || ᐊ$336ᝍ();
        }
        __name(ᐊstrItemᝍ, "ᐊstrItemᝍ");
        function ᐊ$289ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$290ᝍ() && ᐊ$295ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$289ᝍ, "ᐊ$289ᝍ");
        function ᐊ$290ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$291ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$290ᝍ, "ᐊ$290ᝍ");
        function ᐊ$291ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if ((cp < 0 || cp > 31) && cp !== 92 && cp !== 39)
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$291ᝍ, "ᐊ$291ᝍ");
        function ᐊ$295ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          writeUtf8Codepoint(cp);
          IPOS += 1;
          return true;
        }
        __name(ᐊ$295ᝍ, "ᐊ$295ᝍ");
        function ᐊ$296ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$297ᝍ() && ᐊ$300ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$296ᝍ, "ᐊ$296ᝍ");
        function ᐊ$297ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 98;
          return true;
        }
        __name(ᐊ$297ᝍ, "ᐊ$297ᝍ");
        function ᐊ$300ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 8)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$300ᝍ, "ᐊ$300ᝍ");
        function ᐊ$301ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$302ᝍ() && ᐊ$305ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$301ᝍ, "ᐊ$301ᝍ");
        function ᐊ$302ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 102;
          return true;
        }
        __name(ᐊ$302ᝍ, "ᐊ$302ᝍ");
        function ᐊ$305ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 12)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$305ᝍ, "ᐊ$305ᝍ");
        function ᐊ$306ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$307ᝍ() && ᐊ$310ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$306ᝍ, "ᐊ$306ᝍ");
        function ᐊ$307ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 110;
          return true;
        }
        __name(ᐊ$307ᝍ, "ᐊ$307ᝍ");
        function ᐊ$310ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 10)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$310ᝍ, "ᐊ$310ᝍ");
        function ᐊ$311ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$312ᝍ() && ᐊ$315ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$311ᝍ, "ᐊ$311ᝍ");
        function ᐊ$312ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 114;
          return true;
        }
        __name(ᐊ$312ᝍ, "ᐊ$312ᝍ");
        function ᐊ$315ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 13)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$315ᝍ, "ᐊ$315ᝍ");
        function ᐊ$316ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$317ᝍ() && ᐊ$320ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$316ᝍ, "ᐊ$316ᝍ");
        function ᐊ$317ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 116;
          return true;
        }
        __name(ᐊ$317ᝍ, "ᐊ$317ᝍ");
        function ᐊ$320ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 9)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$320ᝍ, "ᐊ$320ᝍ");
        function ᐊ$321ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$322ᝍ() && ᐊ$325ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$321ᝍ, "ᐊ$321ᝍ");
        function ᐊ$322ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 118;
          return true;
        }
        __name(ᐊ$322ᝍ, "ᐊ$322ᝍ");
        function ᐊ$325ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 11)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$325ᝍ, "ᐊ$325ᝍ");
        function ᐊ$326ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$327ᝍ() && ᐊ$330ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$326ᝍ, "ᐊ$326ᝍ");
        function ᐊ$327ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 92;
          return true;
        }
        __name(ᐊ$327ᝍ, "ᐊ$327ᝍ");
        function ᐊ$330ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 92)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$330ᝍ, "ᐊ$330ᝍ");
        function ᐊ$331ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$332ᝍ() && ᐊ$335ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$331ᝍ, "ᐊ$331ᝍ");
        function ᐊ$332ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 39;
          return true;
        }
        __name(ᐊ$332ᝍ, "ᐊ$332ᝍ");
        function ᐊ$335ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 39)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$335ᝍ, "ᐊ$335ᝍ");
        function ᐊ$336ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$337ᝍ() && ᐊ$340ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$336ᝍ, "ᐊ$336ᝍ");
        function ᐊ$337ᝍ() {
          OUT[OPOS++] = 92;
          OUT[OPOS++] = 34;
          return true;
        }
        __name(ᐊ$337ᝍ, "ᐊ$337ᝍ");
        function ᐊ$340ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== 34)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$340ᝍ, "ᐊ$340ᝍ");
        function ᐊboolᝍ() {
          return ᐊ$341ᝍ() || ᐊ$355ᝍ();
        }
        __name(ᐊboolᝍ, "ᐊboolᝍ");
        function ᐊ$341ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$342ᝍ() && ᐊ$347ᝍ() && ᐊ$354ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$341ᝍ, "ᐊ$341ᝍ");
        function ᐊ$342ᝍ() {
          OUT[OPOS++] = 116;
          OUT[OPOS++] = 114;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$342ᝍ, "ᐊ$342ᝍ");
        function ᐊ$347ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$348ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$347ᝍ, "ᐊ$347ᝍ");
        function ᐊ$348ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$348ᝍ, "ᐊ$348ᝍ");
        function ᐊ$354ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== true)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$354ᝍ, "ᐊ$354ᝍ");
        function ᐊ$355ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$356ᝍ() && ᐊ$362ᝍ() && ᐊ$369ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$355ᝍ, "ᐊ$355ᝍ");
        function ᐊ$356ᝍ() {
          OUT[OPOS++] = 102;
          OUT[OPOS++] = 97;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 115;
          OUT[OPOS++] = 101;
          return true;
        }
        __name(ᐊ$356ᝍ, "ᐊ$356ᝍ");
        function ᐊ$362ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$363ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$362ᝍ, "ᐊ$362ᝍ");
        function ᐊ$363ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$363ᝍ, "ᐊ$363ᝍ");
        function ᐊ$369ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== false)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$369ᝍ, "ᐊ$369ᝍ");
        function ᐊnull_ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$370ᝍ() && ᐊ$375ᝍ() && ᐊ$382ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊnull_ᝍ, "ᐊnull_ᝍ");
        function ᐊ$370ᝍ() {
          OUT[OPOS++] = 110;
          OUT[OPOS++] = 117;
          OUT[OPOS++] = 108;
          OUT[OPOS++] = 108;
          return true;
        }
        __name(ᐊ$370ᝍ, "ᐊ$370ᝍ");
        function ᐊ$375ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$376ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$375ᝍ, "ᐊ$375ᝍ");
        function ᐊ$376ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$376ᝍ, "ᐊ$376ᝍ");
        function ᐊ$382ᝍ() {
          if (TYPE !== SCALAR || IPOS >= ILEN)
            return false;
          if (IN[IPOS] !== null)
            return false;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$382ᝍ, "ᐊ$382ᝍ");
        function ᐊrefᝍ() {
          if (TYPE !== RECORD)
            return false;
          var IPOSₒ = IPOS, OPOSₒ = OPOS;
          var i;
          for (i = IPOS; i < ILEN && IN[i] !== "kind"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊ$384ᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          for (i = IPOS; i < ILEN && IN[i] !== "name"; i += 2)
            ;
          if (i >= ILEN)
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
          IPOS += 1;
          if (!printValue(ᐊidᝍ)) {
            return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
          }
          return true;
        }
        __name(ᐊrefᝍ, "ᐊrefᝍ");
        function ᐊ$384ᝍ() {
          if (TYPE !== STRING)
            return false;
          if (IPOS + 2 >= ILEN)
            return false;
          if (IN[IPOS] !== 82)
            return false;
          if (IN[IPOS + 1] !== 101)
            return false;
          if (IN[IPOS + 2] !== 102)
            return false;
          IPOS += 3;
          return true;
        }
        __name(ᐊ$384ᝍ, "ᐊ$384ᝍ");
        function ᐊidᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$386ᝍ() && ᐊ$391ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊidᝍ, "ᐊidᝍ");
        function ᐊ$386ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36)
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$386ᝍ, "ᐊ$386ᝍ");
        function ᐊ$391ᝍ() {
          while (ᐊ$392ᝍ())
            ;
          return true;
        }
        __name(ᐊ$391ᝍ, "ᐊ$391ᝍ");
        function ᐊ$392ᝍ() {
          if (TYPE !== STRING || IPOS >= ILEN)
            return false;
          var cp = IN[IPOS];
          if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
            return false;
          OUT[OPOS++] = cp;
          IPOS += 1;
          return true;
        }
        __name(ᐊ$392ᝍ, "ᐊ$392ᝍ");
        function ᐊEQᝍ() {
          OUT[OPOS++] = 61;
          return true;
        }
        __name(ᐊEQᝍ, "ᐊEQᝍ");
        function ᐊDDᝍ() {
          OUT[OPOS++] = 46;
          OUT[OPOS++] = 46;
          return true;
        }
        __name(ᐊDDᝍ, "ᐊDDᝍ");
        function ᐊWS0ᝍ() {
          return ᐊ$407ᝍ() || ᐊ$411ᝍ();
        }
        __name(ᐊWS0ᝍ, "ᐊWS0ᝍ");
        function ᐊ$407ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$408ᝍ() && ᐊ$409ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$407ᝍ, "ᐊ$407ᝍ");
        function ᐊ$408ᝍ() {
          return false;
        }
        __name(ᐊ$408ᝍ, "ᐊ$408ᝍ");
        function ᐊ$409ᝍ() {
          var IPOSₒ = IPOS;
          for (var count = 0; ᐊ$410ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$409ᝍ, "ᐊ$409ᝍ");
        function ᐊ$410ᝍ() {
          return ᐊHSᝍ() || ᐊCOMMENTᝍ() || ᐊEOLᝍ();
        }
        __name(ᐊ$410ᝍ, "ᐊ$410ᝍ");
        function ᐊ$411ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$412ᝍ() && ᐊ$413ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$411ᝍ, "ᐊ$411ᝍ");
        function ᐊ$412ᝍ() {
          return true;
        }
        __name(ᐊ$412ᝍ, "ᐊ$412ᝍ");
        function ᐊ$413ᝍ() {
          return true;
        }
        __name(ᐊ$413ᝍ, "ᐊ$413ᝍ");
        function ᐊHSᝍ() {
          return ᐊ$414ᝍ() || ᐊ$420ᝍ();
        }
        __name(ᐊHSᝍ, "ᐊHSᝍ");
        function ᐊ$414ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$415ᝍ() && ᐊ$416ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$414ᝍ, "ᐊ$414ᝍ");
        function ᐊ$415ᝍ() {
          return false;
        }
        __name(ᐊ$415ᝍ, "ᐊ$415ᝍ");
        function ᐊ$416ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$417ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$417ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$416ᝍ, "ᐊ$416ᝍ");
        function ᐊ$417ᝍ() {
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$417ᝍ, "ᐊ$417ᝍ");
        function ᐊ$420ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$421ᝍ() && ᐊ$422ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$420ᝍ, "ᐊ$420ᝍ");
        function ᐊ$421ᝍ() {
          return true;
        }
        __name(ᐊ$421ᝍ, "ᐊ$421ᝍ");
        function ᐊ$422ᝍ() {
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$422ᝍ, "ᐊ$422ᝍ");
        function ᐊHS0ᝍ() {
          return ᐊ$423ᝍ() || ᐊ$429ᝍ();
        }
        __name(ᐊHS0ᝍ, "ᐊHS0ᝍ");
        function ᐊ$423ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$424ᝍ() && ᐊ$425ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$423ᝍ, "ᐊ$423ᝍ");
        function ᐊ$424ᝍ() {
          return false;
        }
        __name(ᐊ$424ᝍ, "ᐊ$424ᝍ");
        function ᐊ$425ᝍ() {
          var IPOSₒ = IPOS;
          for (var count = 0; ᐊ$426ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$425ᝍ, "ᐊ$425ᝍ");
        function ᐊ$426ᝍ() {
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$426ᝍ, "ᐊ$426ᝍ");
        function ᐊ$429ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$430ᝍ() && ᐊ$431ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$429ᝍ, "ᐊ$429ᝍ");
        function ᐊ$430ᝍ() {
          return true;
        }
        __name(ᐊ$430ᝍ, "ᐊ$430ᝍ");
        function ᐊ$431ᝍ() {
          return true;
        }
        __name(ᐊ$431ᝍ, "ᐊ$431ᝍ");
        function ᐊHS4ᝍ() {
          return ᐊ$432ᝍ() || ᐊ$438ᝍ();
        }
        __name(ᐊHS4ᝍ, "ᐊHS4ᝍ");
        function ᐊ$432ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$433ᝍ() && ᐊ$434ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$432ᝍ, "ᐊ$432ᝍ");
        function ᐊ$433ᝍ() {
          return false;
        }
        __name(ᐊ$433ᝍ, "ᐊ$433ᝍ");
        function ᐊ$434ᝍ() {
          var IPOSₒ = IPOS;
          if (!ᐊ$435ᝍ()) {
            return false;
          }
          for (var count = 1; ᐊ$435ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$434ᝍ, "ᐊ$434ᝍ");
        function ᐊ$435ᝍ() {
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$435ᝍ, "ᐊ$435ᝍ");
        function ᐊ$438ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$439ᝍ() && ᐊ$440ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$438ᝍ, "ᐊ$438ᝍ");
        function ᐊ$439ᝍ() {
          return true;
        }
        __name(ᐊ$439ᝍ, "ᐊ$439ᝍ");
        function ᐊ$440ᝍ() {
          OUT[OPOS++] = 32;
          OUT[OPOS++] = 32;
          OUT[OPOS++] = 32;
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$440ᝍ, "ᐊ$440ᝍ");
        function ᐊCOMMENTᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$445ᝍ() && ᐊ$446ᝍ() && ᐊ$448ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊCOMMENTᝍ, "ᐊCOMMENTᝍ");
        function ᐊ$445ᝍ() {
          OUT[OPOS++] = 35;
          return true;
        }
        __name(ᐊ$445ᝍ, "ᐊ$445ᝍ");
        function ᐊ$446ᝍ() {
          return ᐊ$447ᝍ() || true;
        }
        __name(ᐊ$446ᝍ, "ᐊ$446ᝍ");
        function ᐊ$447ᝍ() {
          OUT[OPOS++] = 32;
          return true;
        }
        __name(ᐊ$447ᝍ, "ᐊ$447ᝍ");
        function ᐊ$448ᝍ() {
          var IPOSₒ = IPOS;
          for (var count = 0; ᐊ$449ᝍ(); ++count) {
            $assert(IPOS > IPOSₒ || count <= 100, "Infinite non-consuming iteration detected");
          }
          return true;
        }
        __name(ᐊ$448ᝍ, "ᐊ$448ᝍ");
        function ᐊ$449ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          if (ᐊ$450ᝍ() && ᐊ$452ᝍ() && ᐊ$454ᝍ())
            return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return false;
        }
        __name(ᐊ$449ᝍ, "ᐊ$449ᝍ");
        function ᐊ$450ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$451ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$450ᝍ, "ᐊ$450ᝍ");
        function ᐊ$451ᝍ() {
          OUT[OPOS++] = 13;
          return true;
        }
        __name(ᐊ$451ᝍ, "ᐊ$451ᝍ");
        function ᐊ$452ᝍ() {
          var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
          var result = !ᐊ$453ᝍ();
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          return result;
        }
        __name(ᐊ$452ᝍ, "ᐊ$452ᝍ");
        function ᐊ$453ᝍ() {
          OUT[OPOS++] = 10;
          return true;
        }
        __name(ᐊ$453ᝍ, "ᐊ$453ᝍ");
        function ᐊ$454ᝍ() {
          OUT[OPOS++] = 0;
          return true;
        }
        __name(ᐊ$454ᝍ, "ᐊ$454ᝍ");
        function ᐊEOLᝍ() {
          return ᐊ$455ᝍ() || ᐊ$458ᝍ() || ᐊ$459ᝍ();
        }
        __name(ᐊEOLᝍ, "ᐊEOLᝍ");
        function ᐊ$455ᝍ() {
          OUT[OPOS++] = 13;
          OUT[OPOS++] = 10;
          return true;
        }
        __name(ᐊ$455ᝍ, "ᐊ$455ᝍ");
        function ᐊ$458ᝍ() {
          OUT[OPOS++] = 13;
          return true;
        }
        __name(ᐊ$458ᝍ, "ᐊ$458ᝍ");
        function ᐊ$459ᝍ() {
          OUT[OPOS++] = 10;
          return true;
        }
        __name(ᐊ$459ᝍ, "ᐊ$459ᝍ");
        m.exports = { parse: $parse, print: $print };
      })(module2);
    }
  });

  // src/frontends/peg/peg.pegjs
  var require_peg = __commonJS({
    "src/frontends/peg/peg.pegjs"(exports2, module2) {
      "use strict";
      function peg$subclass2(child, parent) {
        function C() {
          this.constructor = child;
        }
        __name(C, "C");
        C.prototype = parent.prototype;
        child.prototype = new C();
      }
      __name(peg$subclass2, "peg$subclass");
      function peg$SyntaxError2(message, expected2, found, location2) {
        var self = Error.call(this, message);
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(self, peg$SyntaxError2.prototype);
        }
        self.expected = expected2;
        self.found = found;
        self.location = location2;
        self.name = "SyntaxError";
        return self;
      }
      __name(peg$SyntaxError2, "peg$SyntaxError");
      peg$subclass2(peg$SyntaxError2, Error);
      function peg$padEnd2(str, targetLength, padString) {
        padString = padString || " ";
        if (str.length > targetLength) {
          return str;
        }
        targetLength -= str.length;
        padString += padString.repeat(targetLength);
        return str + padString.slice(0, targetLength);
      }
      __name(peg$padEnd2, "peg$padEnd");
      peg$SyntaxError2.prototype.format = function(sources) {
        var str = "Error: " + this.message;
        if (this.location) {
          var src = null;
          var k;
          for (k = 0; k < sources.length; k++) {
            if (sources[k].source === this.location.source) {
              src = sources[k].text.split(/\r\n|\n|\r/g);
              break;
            }
          }
          var s = this.location.start;
          var loc = this.location.source + ":" + s.line + ":" + s.column;
          if (src) {
            var e = this.location.end;
            var filler = peg$padEnd2("", s.line.toString().length, " ");
            var line = src[s.line - 1];
            var last = s.line === e.line ? e.column : line.length + 1;
            var hatLen = last - s.column || 1;
            str += "\n --> " + loc + "\n" + filler + " |\n" + s.line + " | " + line + "\n" + filler + " | " + peg$padEnd2("", s.column - 1, " ") + peg$padEnd2("", hatLen, "^");
          } else {
            str += "\n at " + loc;
          }
        }
        return str;
      };
      peg$SyntaxError2.buildMessage = function(expected2, found) {
        var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return '"' + literalEscape(expectation.text) + '"';
          },
          class: function(expectation) {
            var escapedParts = expectation.parts.map(function(part) {
              return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
            });
            return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
          },
          any: function() {
            return "any character";
          },
          end: function() {
            return "end of input";
          },
          other: function(expectation) {
            return expectation.description;
          }
        };
        function hex(ch) {
          return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        __name(hex, "hex");
        function literalEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        __name(literalEscape, "literalEscape");
        function classEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        __name(classEscape, "classEscape");
        function describeExpectation(expectation) {
          return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        __name(describeExpectation, "describeExpectation");
        function describeExpected(expected3) {
          var descriptions = expected3.map(describeExpectation);
          var i, j;
          descriptions.sort();
          if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
              if (descriptions[i - 1] !== descriptions[i]) {
                descriptions[j] = descriptions[i];
                j++;
              }
            }
            descriptions.length = j;
          }
          switch (descriptions.length) {
            case 1:
              return descriptions[0];
            case 2:
              return descriptions[0] + " or " + descriptions[1];
            default:
              return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
          }
        }
        __name(describeExpected, "describeExpected");
        function describeFound(found2) {
          return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
        }
        __name(describeFound, "describeFound");
        return "Expected " + describeExpected(expected2) + " but " + describeFound(found) + " found.";
      };
      function peg$parse2(input2, options2) {
        options2 = options2 !== void 0 ? options2 : {};
        var peg$FAILED2 = {};
        var peg$source2 = options2.grammarSource;
        var peg$startRuleFunctions2 = { Grammar: peg$parseGrammar2 };
        var peg$startRuleFunction2 = peg$parseGrammar2;
        var peg$c02 = "[";
        var peg$c110 = "]";
        var peg$c210 = "-";
        var peg$c36 = "\\n";
        var peg$c42 = "\\r";
        var peg$c52 = "\\t";
        var peg$c62 = "\\'";
        var peg$c72 = '\\"';
        var peg$c82 = "\\[";
        var peg$c92 = "\\]";
        var peg$c102 = "\\\\";
        var peg$c112 = "\\";
        var peg$c122 = "<-";
        var peg$c132 = "/";
        var peg$c142 = "&";
        var peg$c152 = "!";
        var peg$c162 = "?";
        var peg$c172 = "*";
        var peg$c182 = "+";
        var peg$c192 = "(";
        var peg$c202 = ")";
        var peg$c212 = ".";
        var peg$c222 = "#";
        var peg$c232 = " ";
        var peg$c242 = "	";
        var peg$c252 = "\r\n";
        var peg$c262 = "\n";
        var peg$c272 = "\r";
        var peg$r02 = /^[a-zA-Z_]/;
        var peg$r14 = /^[0-9]/;
        var peg$r22 = /^[']/;
        var peg$r32 = /^["]/;
        var peg$e02 = peg$classExpectation2([["a", "z"], ["A", "Z"], "_"], false, false);
        var peg$e110 = peg$classExpectation2([["0", "9"]], false, false);
        var peg$e210 = peg$classExpectation2(["'"], false, false);
        var peg$e310 = peg$classExpectation2(['"'], false, false);
        var peg$e410 = peg$literalExpectation2("[", false);
        var peg$e52 = peg$literalExpectation2("]", false);
        var peg$e62 = peg$literalExpectation2("-", false);
        var peg$e72 = peg$literalExpectation2("\\n", false);
        var peg$e82 = peg$literalExpectation2("\\r", false);
        var peg$e92 = peg$literalExpectation2("\\t", false);
        var peg$e102 = peg$literalExpectation2("\\'", false);
        var peg$e112 = peg$literalExpectation2('\\"', false);
        var peg$e122 = peg$literalExpectation2("\\[", false);
        var peg$e132 = peg$literalExpectation2("\\]", false);
        var peg$e142 = peg$literalExpectation2("\\\\", false);
        var peg$e152 = peg$literalExpectation2("\\", false);
        var peg$e162 = peg$anyExpectation2();
        var peg$e172 = peg$literalExpectation2("<-", false);
        var peg$e182 = peg$literalExpectation2("/", false);
        var peg$e192 = peg$literalExpectation2("&", false);
        var peg$e202 = peg$literalExpectation2("!", false);
        var peg$e212 = peg$literalExpectation2("?", false);
        var peg$e222 = peg$literalExpectation2("*", false);
        var peg$e232 = peg$literalExpectation2("+", false);
        var peg$e242 = peg$literalExpectation2("(", false);
        var peg$e252 = peg$literalExpectation2(")", false);
        var peg$e262 = peg$literalExpectation2(".", false);
        var peg$e272 = peg$literalExpectation2("#", false);
        var peg$e282 = peg$literalExpectation2(" ", false);
        var peg$e292 = peg$literalExpectation2("	", false);
        var peg$e302 = peg$literalExpectation2("\r\n", false);
        var peg$e312 = peg$literalExpectation2("\n", false);
        var peg$e322 = peg$literalExpectation2("\r", false);
        var peg$f02 = /* @__PURE__ */ __name(function(defns) {
          return { definitions: defns.map((defn) => defn[1]) };
        }, "peg$f0");
        var peg$f110 = /* @__PURE__ */ __name(function(lhs, rhs) {
          return { kind: "Definition", lhs, rhs };
        }, "peg$f1");
        var peg$f210 = /* @__PURE__ */ __name(function(h, t) {
          return { kind: "Choice", items: [h].concat(t.map((el) => el[3])), text: text2() };
        }, "peg$f2");
        var peg$f310 = /* @__PURE__ */ __name(function(h, t) {
          return { kind: "Sequence", items: [h].concat(t.map((el) => el[1])), text: text2() };
        }, "peg$f3");
        var peg$f42 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "Lookahead", positive: true, expression, text: text2() };
        }, "peg$f4");
        var peg$f52 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "Lookahead", positive: false, expression, text: text2() };
        }, "peg$f5");
        var peg$f62 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "Optional", expression, text: text2() };
        }, "peg$f6");
        var peg$f72 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "ZeroOrMore", expression, text: text2() };
        }, "peg$f7");
        var peg$f82 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "OneOrMore", expression, text: text2() };
        }, "peg$f8");
        var peg$f92 = /* @__PURE__ */ __name(function(identifier) {
          return { kind: "Reference", identifier, text: text2() };
        }, "peg$f9");
        var peg$f102 = /* @__PURE__ */ __name(function(expression) {
          return expression;
        }, "peg$f10");
        var peg$f112 = /* @__PURE__ */ __name(function(value) {
          return { kind: "Literal", value, text: text2() };
        }, "peg$f11");
        var peg$f122 = /* @__PURE__ */ __name(function(ranges) {
          return { kind: "Class", ranges, text: text2() };
        }, "peg$f12");
        var peg$f132 = /* @__PURE__ */ __name(function() {
          return { kind: "AnyChar", text: text2() };
        }, "peg$f13");
        var peg$f142 = /* @__PURE__ */ __name(function(h, t) {
          return h + t.join("");
        }, "peg$f14");
        var peg$f152 = /* @__PURE__ */ __name(function(cs) {
          return cs.map((el) => el[1]).join("");
        }, "peg$f15");
        var peg$f162 = /* @__PURE__ */ __name(function(cs) {
          return cs.map((el) => el[1]).join("");
        }, "peg$f16");
        var peg$f172 = /* @__PURE__ */ __name(function(items) {
          return items.map((el) => el[1]);
        }, "peg$f17");
        var peg$f182 = /* @__PURE__ */ __name(function(min, max) {
          return [min, max];
        }, "peg$f18");
        var peg$f192 = /* @__PURE__ */ __name(function(c2) {
          return [c2, c2];
        }, "peg$f19");
        var peg$f202 = /* @__PURE__ */ __name(function() {
          return "\n";
        }, "peg$f20");
        var peg$f212 = /* @__PURE__ */ __name(function() {
          return "\r";
        }, "peg$f21");
        var peg$f222 = /* @__PURE__ */ __name(function() {
          return "	";
        }, "peg$f22");
        var peg$f232 = /* @__PURE__ */ __name(function() {
          return "'";
        }, "peg$f23");
        var peg$f242 = /* @__PURE__ */ __name(function() {
          return '"';
        }, "peg$f24");
        var peg$f252 = /* @__PURE__ */ __name(function() {
          return "[";
        }, "peg$f25");
        var peg$f262 = /* @__PURE__ */ __name(function() {
          return "]";
        }, "peg$f26");
        var peg$f272 = /* @__PURE__ */ __name(function() {
          return "\\";
        }, "peg$f27");
        var peg$f282 = /* @__PURE__ */ __name(function(c2) {
          return c2;
        }, "peg$f28");
        var peg$currPos2 = 0;
        var peg$savedPos2 = 0;
        var peg$posDetailsCache2 = [{ line: 1, column: 1 }];
        var peg$maxFailPos2 = 0;
        var peg$maxFailExpected2 = [];
        var peg$silentFails2 = 0;
        var peg$result2;
        if ("startRule" in options2) {
          if (!(options2.startRule in peg$startRuleFunctions2)) {
            throw new Error(`Can't start parsing from rule "` + options2.startRule + '".');
          }
          peg$startRuleFunction2 = peg$startRuleFunctions2[options2.startRule];
        }
        function text2() {
          return input2.substring(peg$savedPos2, peg$currPos2);
        }
        __name(text2, "text");
        function offset2() {
          return peg$savedPos2;
        }
        __name(offset2, "offset");
        function range2() {
          return {
            source: peg$source2,
            start: peg$savedPos2,
            end: peg$currPos2
          };
        }
        __name(range2, "range");
        function location2() {
          return peg$computeLocation2(peg$savedPos2, peg$currPos2);
        }
        __name(location2, "location");
        function expected2(description, location3) {
          location3 = location3 !== void 0 ? location3 : peg$computeLocation2(peg$savedPos2, peg$currPos2);
          throw peg$buildStructuredError2(
            [peg$otherExpectation2(description)],
            input2.substring(peg$savedPos2, peg$currPos2),
            location3
          );
        }
        __name(expected2, "expected");
        function error2(message, location3) {
          location3 = location3 !== void 0 ? location3 : peg$computeLocation2(peg$savedPos2, peg$currPos2);
          throw peg$buildSimpleError2(message, location3);
        }
        __name(error2, "error");
        function peg$literalExpectation2(text3, ignoreCase) {
          return { type: "literal", text: text3, ignoreCase };
        }
        __name(peg$literalExpectation2, "peg$literalExpectation");
        function peg$classExpectation2(parts, inverted, ignoreCase) {
          return { type: "class", parts, inverted, ignoreCase };
        }
        __name(peg$classExpectation2, "peg$classExpectation");
        function peg$anyExpectation2() {
          return { type: "any" };
        }
        __name(peg$anyExpectation2, "peg$anyExpectation");
        function peg$endExpectation2() {
          return { type: "end" };
        }
        __name(peg$endExpectation2, "peg$endExpectation");
        function peg$otherExpectation2(description) {
          return { type: "other", description };
        }
        __name(peg$otherExpectation2, "peg$otherExpectation");
        function peg$computePosDetails2(pos) {
          var details = peg$posDetailsCache2[pos];
          var p;
          if (details) {
            return details;
          } else {
            p = pos - 1;
            while (!peg$posDetailsCache2[p]) {
              p--;
            }
            details = peg$posDetailsCache2[p];
            details = {
              line: details.line,
              column: details.column
            };
            while (p < pos) {
              if (input2.charCodeAt(p) === 10) {
                details.line++;
                details.column = 1;
              } else {
                details.column++;
              }
              p++;
            }
            peg$posDetailsCache2[pos] = details;
            return details;
          }
        }
        __name(peg$computePosDetails2, "peg$computePosDetails");
        function peg$computeLocation2(startPos, endPos) {
          var startPosDetails = peg$computePosDetails2(startPos);
          var endPosDetails = peg$computePosDetails2(endPos);
          return {
            source: peg$source2,
            start: {
              offset: startPos,
              line: startPosDetails.line,
              column: startPosDetails.column
            },
            end: {
              offset: endPos,
              line: endPosDetails.line,
              column: endPosDetails.column
            }
          };
        }
        __name(peg$computeLocation2, "peg$computeLocation");
        function peg$fail2(expected3) {
          if (peg$currPos2 < peg$maxFailPos2) {
            return;
          }
          if (peg$currPos2 > peg$maxFailPos2) {
            peg$maxFailPos2 = peg$currPos2;
            peg$maxFailExpected2 = [];
          }
          peg$maxFailExpected2.push(expected3);
        }
        __name(peg$fail2, "peg$fail");
        function peg$buildSimpleError2(message, location3) {
          return new peg$SyntaxError2(message, null, null, location3);
        }
        __name(peg$buildSimpleError2, "peg$buildSimpleError");
        function peg$buildStructuredError2(expected3, found, location3) {
          return new peg$SyntaxError2(
            peg$SyntaxError2.buildMessage(expected3, found),
            expected3,
            found,
            location3
          );
        }
        __name(peg$buildStructuredError2, "peg$buildStructuredError");
        function peg$parseGrammar2() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          s1 = peg$parseWS2();
          s2 = [];
          s3 = peg$currPos2;
          s4 = peg$parseWS2();
          s5 = peg$parseDefinition2();
          if (s5 !== peg$FAILED2) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos2 = s3;
            s3 = peg$FAILED2;
          }
          if (s3 !== peg$FAILED2) {
            while (s3 !== peg$FAILED2) {
              s2.push(s3);
              s3 = peg$currPos2;
              s4 = peg$parseWS2();
              s5 = peg$parseDefinition2();
              if (s5 !== peg$FAILED2) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            }
          } else {
            s2 = peg$FAILED2;
          }
          if (s2 !== peg$FAILED2) {
            s3 = peg$parseWS2();
            s4 = peg$parseEndOfFile2();
            if (s4 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f02(s2);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          return s0;
        }
        __name(peg$parseGrammar2, "peg$parseGrammar");
        function peg$parseDefinition2() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          s1 = peg$parseIdentifier2();
          if (s1 !== peg$FAILED2) {
            s2 = peg$parseWS2();
            s3 = peg$parseLEFTARROW();
            if (s3 !== peg$FAILED2) {
              s4 = peg$parseWS2();
              s5 = peg$parseExpression();
              if (s5 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s0 = peg$f110(s1, s5);
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          return s0;
        }
        __name(peg$parseDefinition2, "peg$parseDefinition");
        function peg$parseExpression() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          s0 = peg$currPos2;
          s1 = peg$parseSequence2();
          if (s1 !== peg$FAILED2) {
            s2 = [];
            s3 = peg$currPos2;
            s4 = peg$parseWS2();
            s5 = peg$parseSLASH();
            if (s5 !== peg$FAILED2) {
              s6 = peg$parseWS2();
              s7 = peg$parseSequence2();
              if (s7 !== peg$FAILED2) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s3;
              s3 = peg$FAILED2;
            }
            if (s3 !== peg$FAILED2) {
              while (s3 !== peg$FAILED2) {
                s2.push(s3);
                s3 = peg$currPos2;
                s4 = peg$parseWS2();
                s5 = peg$parseSLASH();
                if (s5 !== peg$FAILED2) {
                  s6 = peg$parseWS2();
                  s7 = peg$parseSequence2();
                  if (s7 !== peg$FAILED2) {
                    s4 = [s4, s5, s6, s7];
                    s3 = s4;
                  } else {
                    peg$currPos2 = s3;
                    s3 = peg$FAILED2;
                  }
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              }
            } else {
              s2 = peg$FAILED2;
            }
            if (s2 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f210(s1, s2);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$parseSequence2();
          }
          return s0;
        }
        __name(peg$parseExpression, "peg$parseExpression");
        function peg$parseSequence2() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          s1 = peg$parsePrefix();
          if (s1 !== peg$FAILED2) {
            s2 = [];
            s3 = peg$currPos2;
            s4 = peg$parseWS2();
            s5 = peg$parsePrefix();
            if (s5 !== peg$FAILED2) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos2 = s3;
              s3 = peg$FAILED2;
            }
            if (s3 !== peg$FAILED2) {
              while (s3 !== peg$FAILED2) {
                s2.push(s3);
                s3 = peg$currPos2;
                s4 = peg$parseWS2();
                s5 = peg$parsePrefix();
                if (s5 !== peg$FAILED2) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              }
            } else {
              s2 = peg$FAILED2;
            }
            if (s2 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f310(s1, s2);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$parsePrefix();
          }
          return s0;
        }
        __name(peg$parseSequence2, "peg$parseSequence");
        function peg$parsePrefix() {
          var s0, s1, s2;
          s0 = peg$currPos2;
          s1 = peg$parseAND();
          if (s1 !== peg$FAILED2) {
            s2 = peg$parseSuffix();
            if (s2 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f42(s2);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$currPos2;
            s1 = peg$parseNOT();
            if (s1 !== peg$FAILED2) {
              s2 = peg$parseSuffix();
              if (s2 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s0 = peg$f52(s2);
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
            if (s0 === peg$FAILED2) {
              s0 = peg$parseSuffix();
            }
          }
          return s0;
        }
        __name(peg$parsePrefix, "peg$parsePrefix");
        function peg$parseSuffix() {
          var s0, s1, s2;
          s0 = peg$currPos2;
          s1 = peg$parsePrimary();
          if (s1 !== peg$FAILED2) {
            s2 = peg$parseQUESTION();
            if (s2 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f62(s1);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$currPos2;
            s1 = peg$parsePrimary();
            if (s1 !== peg$FAILED2) {
              s2 = peg$parseSTAR();
              if (s2 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s0 = peg$f72(s1);
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
            if (s0 === peg$FAILED2) {
              s0 = peg$currPos2;
              s1 = peg$parsePrimary();
              if (s1 !== peg$FAILED2) {
                s2 = peg$parsePLUS();
                if (s2 !== peg$FAILED2) {
                  peg$savedPos2 = s0;
                  s0 = peg$f82(s1);
                } else {
                  peg$currPos2 = s0;
                  s0 = peg$FAILED2;
                }
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
              if (s0 === peg$FAILED2) {
                s0 = peg$parsePrimary();
              }
            }
          }
          return s0;
        }
        __name(peg$parseSuffix, "peg$parseSuffix");
        function peg$parsePrimary() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          s1 = peg$parseIdentifier2();
          if (s1 !== peg$FAILED2) {
            s2 = peg$currPos2;
            peg$silentFails2++;
            s3 = peg$currPos2;
            s4 = peg$parseWS2();
            s5 = peg$parseLEFTARROW();
            if (s5 !== peg$FAILED2) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos2 = s3;
              s3 = peg$FAILED2;
            }
            peg$silentFails2--;
            if (s3 === peg$FAILED2) {
              s2 = void 0;
            } else {
              peg$currPos2 = s2;
              s2 = peg$FAILED2;
            }
            if (s2 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f92(s1);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$currPos2;
            s1 = peg$parseOPEN();
            if (s1 !== peg$FAILED2) {
              s2 = peg$parseWS2();
              s3 = peg$parseExpression();
              if (s3 !== peg$FAILED2) {
                s4 = peg$parseWS2();
                s5 = peg$parseCLOSE();
                if (s5 !== peg$FAILED2) {
                  peg$savedPos2 = s0;
                  s0 = peg$f102(s3);
                } else {
                  peg$currPos2 = s0;
                  s0 = peg$FAILED2;
                }
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
            if (s0 === peg$FAILED2) {
              s0 = peg$currPos2;
              s1 = peg$parseLiteral();
              if (s1 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s1 = peg$f112(s1);
              }
              s0 = s1;
              if (s0 === peg$FAILED2) {
                s0 = peg$currPos2;
                s1 = peg$parseClass();
                if (s1 !== peg$FAILED2) {
                  peg$savedPos2 = s0;
                  s1 = peg$f122(s1);
                }
                s0 = s1;
                if (s0 === peg$FAILED2) {
                  s0 = peg$currPos2;
                  s1 = peg$parseDOT();
                  if (s1 !== peg$FAILED2) {
                    peg$savedPos2 = s0;
                    s1 = peg$f132();
                  }
                  s0 = s1;
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parsePrimary, "peg$parsePrimary");
        function peg$parseIdentifier2() {
          var s0, s1, s2, s3;
          s0 = peg$currPos2;
          s1 = peg$parseIdentStart2();
          if (s1 !== peg$FAILED2) {
            s2 = [];
            s3 = peg$parseIdentCont2();
            while (s3 !== peg$FAILED2) {
              s2.push(s3);
              s3 = peg$parseIdentCont2();
            }
            peg$savedPos2 = s0;
            s0 = peg$f142(s1, s2);
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          return s0;
        }
        __name(peg$parseIdentifier2, "peg$parseIdentifier");
        function peg$parseIdentStart2() {
          var s0;
          if (peg$r02.test(input2.charAt(peg$currPos2))) {
            s0 = input2.charAt(peg$currPos2);
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e02);
            }
          }
          return s0;
        }
        __name(peg$parseIdentStart2, "peg$parseIdentStart");
        function peg$parseIdentCont2() {
          var s0;
          s0 = peg$parseIdentStart2();
          if (s0 === peg$FAILED2) {
            if (peg$r14.test(input2.charAt(peg$currPos2))) {
              s0 = input2.charAt(peg$currPos2);
              peg$currPos2++;
            } else {
              s0 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e110);
              }
            }
          }
          return s0;
        }
        __name(peg$parseIdentCont2, "peg$parseIdentCont");
        function peg$parseLiteral() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          if (peg$r22.test(input2.charAt(peg$currPos2))) {
            s1 = input2.charAt(peg$currPos2);
            peg$currPos2++;
          } else {
            s1 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e210);
            }
          }
          if (s1 !== peg$FAILED2) {
            s2 = [];
            s3 = peg$currPos2;
            s4 = peg$currPos2;
            peg$silentFails2++;
            if (peg$r22.test(input2.charAt(peg$currPos2))) {
              s5 = input2.charAt(peg$currPos2);
              peg$currPos2++;
            } else {
              s5 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e210);
              }
            }
            peg$silentFails2--;
            if (s5 === peg$FAILED2) {
              s4 = void 0;
            } else {
              peg$currPos2 = s4;
              s4 = peg$FAILED2;
            }
            if (s4 !== peg$FAILED2) {
              s5 = peg$parseChar2();
              if (s5 !== peg$FAILED2) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s3;
              s3 = peg$FAILED2;
            }
            while (s3 !== peg$FAILED2) {
              s2.push(s3);
              s3 = peg$currPos2;
              s4 = peg$currPos2;
              peg$silentFails2++;
              if (peg$r22.test(input2.charAt(peg$currPos2))) {
                s5 = input2.charAt(peg$currPos2);
                peg$currPos2++;
              } else {
                s5 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e210);
                }
              }
              peg$silentFails2--;
              if (s5 === peg$FAILED2) {
                s4 = void 0;
              } else {
                peg$currPos2 = s4;
                s4 = peg$FAILED2;
              }
              if (s4 !== peg$FAILED2) {
                s5 = peg$parseChar2();
                if (s5 !== peg$FAILED2) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            }
            if (peg$r22.test(input2.charAt(peg$currPos2))) {
              s3 = input2.charAt(peg$currPos2);
              peg$currPos2++;
            } else {
              s3 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e210);
              }
            }
            if (s3 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f152(s2);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$currPos2;
            if (peg$r32.test(input2.charAt(peg$currPos2))) {
              s1 = input2.charAt(peg$currPos2);
              peg$currPos2++;
            } else {
              s1 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e310);
              }
            }
            if (s1 !== peg$FAILED2) {
              s2 = [];
              s3 = peg$currPos2;
              s4 = peg$currPos2;
              peg$silentFails2++;
              if (peg$r32.test(input2.charAt(peg$currPos2))) {
                s5 = input2.charAt(peg$currPos2);
                peg$currPos2++;
              } else {
                s5 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e310);
                }
              }
              peg$silentFails2--;
              if (s5 === peg$FAILED2) {
                s4 = void 0;
              } else {
                peg$currPos2 = s4;
                s4 = peg$FAILED2;
              }
              if (s4 !== peg$FAILED2) {
                s5 = peg$parseChar2();
                if (s5 !== peg$FAILED2) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
              while (s3 !== peg$FAILED2) {
                s2.push(s3);
                s3 = peg$currPos2;
                s4 = peg$currPos2;
                peg$silentFails2++;
                if (peg$r32.test(input2.charAt(peg$currPos2))) {
                  s5 = input2.charAt(peg$currPos2);
                  peg$currPos2++;
                } else {
                  s5 = peg$FAILED2;
                  if (peg$silentFails2 === 0) {
                    peg$fail2(peg$e310);
                  }
                }
                peg$silentFails2--;
                if (s5 === peg$FAILED2) {
                  s4 = void 0;
                } else {
                  peg$currPos2 = s4;
                  s4 = peg$FAILED2;
                }
                if (s4 !== peg$FAILED2) {
                  s5 = peg$parseChar2();
                  if (s5 !== peg$FAILED2) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos2 = s3;
                    s3 = peg$FAILED2;
                  }
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              }
              if (peg$r32.test(input2.charAt(peg$currPos2))) {
                s3 = input2.charAt(peg$currPos2);
                peg$currPos2++;
              } else {
                s3 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e310);
                }
              }
              if (s3 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s0 = peg$f162(s2);
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          }
          return s0;
        }
        __name(peg$parseLiteral, "peg$parseLiteral");
        function peg$parseClass() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          if (input2.charCodeAt(peg$currPos2) === 91) {
            s1 = peg$c02;
            peg$currPos2++;
          } else {
            s1 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e410);
            }
          }
          if (s1 !== peg$FAILED2) {
            s2 = [];
            s3 = peg$currPos2;
            s4 = peg$currPos2;
            peg$silentFails2++;
            if (input2.charCodeAt(peg$currPos2) === 93) {
              s5 = peg$c110;
              peg$currPos2++;
            } else {
              s5 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e52);
              }
            }
            peg$silentFails2--;
            if (s5 === peg$FAILED2) {
              s4 = void 0;
            } else {
              peg$currPos2 = s4;
              s4 = peg$FAILED2;
            }
            if (s4 !== peg$FAILED2) {
              s5 = peg$parseRange();
              if (s5 !== peg$FAILED2) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s3;
              s3 = peg$FAILED2;
            }
            while (s3 !== peg$FAILED2) {
              s2.push(s3);
              s3 = peg$currPos2;
              s4 = peg$currPos2;
              peg$silentFails2++;
              if (input2.charCodeAt(peg$currPos2) === 93) {
                s5 = peg$c110;
                peg$currPos2++;
              } else {
                s5 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e52);
                }
              }
              peg$silentFails2--;
              if (s5 === peg$FAILED2) {
                s4 = void 0;
              } else {
                peg$currPos2 = s4;
                s4 = peg$FAILED2;
              }
              if (s4 !== peg$FAILED2) {
                s5 = peg$parseRange();
                if (s5 !== peg$FAILED2) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            }
            if (input2.charCodeAt(peg$currPos2) === 93) {
              s3 = peg$c110;
              peg$currPos2++;
            } else {
              s3 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e52);
              }
            }
            if (s3 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s0 = peg$f172(s2);
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          return s0;
        }
        __name(peg$parseClass, "peg$parseClass");
        function peg$parseRange() {
          var s0, s1, s2, s3;
          s0 = peg$currPos2;
          s1 = peg$parseChar2();
          if (s1 !== peg$FAILED2) {
            if (input2.charCodeAt(peg$currPos2) === 45) {
              s2 = peg$c210;
              peg$currPos2++;
            } else {
              s2 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e62);
              }
            }
            if (s2 !== peg$FAILED2) {
              s3 = peg$parseChar2();
              if (s3 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s0 = peg$f182(s1, s3);
              } else {
                peg$currPos2 = s0;
                s0 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          if (s0 === peg$FAILED2) {
            s0 = peg$currPos2;
            s1 = peg$parseChar2();
            if (s1 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s1 = peg$f192(s1);
            }
            s0 = s1;
          }
          return s0;
        }
        __name(peg$parseRange, "peg$parseRange");
        function peg$parseChar2() {
          var s0, s1, s2;
          s0 = peg$currPos2;
          if (input2.substr(peg$currPos2, 2) === peg$c36) {
            s1 = peg$c36;
            peg$currPos2 += 2;
          } else {
            s1 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e72);
            }
          }
          if (s1 !== peg$FAILED2) {
            peg$savedPos2 = s0;
            s1 = peg$f202();
          }
          s0 = s1;
          if (s0 === peg$FAILED2) {
            s0 = peg$currPos2;
            if (input2.substr(peg$currPos2, 2) === peg$c42) {
              s1 = peg$c42;
              peg$currPos2 += 2;
            } else {
              s1 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e82);
              }
            }
            if (s1 !== peg$FAILED2) {
              peg$savedPos2 = s0;
              s1 = peg$f212();
            }
            s0 = s1;
            if (s0 === peg$FAILED2) {
              s0 = peg$currPos2;
              if (input2.substr(peg$currPos2, 2) === peg$c52) {
                s1 = peg$c52;
                peg$currPos2 += 2;
              } else {
                s1 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e92);
                }
              }
              if (s1 !== peg$FAILED2) {
                peg$savedPos2 = s0;
                s1 = peg$f222();
              }
              s0 = s1;
              if (s0 === peg$FAILED2) {
                s0 = peg$currPos2;
                if (input2.substr(peg$currPos2, 2) === peg$c62) {
                  s1 = peg$c62;
                  peg$currPos2 += 2;
                } else {
                  s1 = peg$FAILED2;
                  if (peg$silentFails2 === 0) {
                    peg$fail2(peg$e102);
                  }
                }
                if (s1 !== peg$FAILED2) {
                  peg$savedPos2 = s0;
                  s1 = peg$f232();
                }
                s0 = s1;
                if (s0 === peg$FAILED2) {
                  s0 = peg$currPos2;
                  if (input2.substr(peg$currPos2, 2) === peg$c72) {
                    s1 = peg$c72;
                    peg$currPos2 += 2;
                  } else {
                    s1 = peg$FAILED2;
                    if (peg$silentFails2 === 0) {
                      peg$fail2(peg$e112);
                    }
                  }
                  if (s1 !== peg$FAILED2) {
                    peg$savedPos2 = s0;
                    s1 = peg$f242();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED2) {
                    s0 = peg$currPos2;
                    if (input2.substr(peg$currPos2, 2) === peg$c82) {
                      s1 = peg$c82;
                      peg$currPos2 += 2;
                    } else {
                      s1 = peg$FAILED2;
                      if (peg$silentFails2 === 0) {
                        peg$fail2(peg$e122);
                      }
                    }
                    if (s1 !== peg$FAILED2) {
                      peg$savedPos2 = s0;
                      s1 = peg$f252();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED2) {
                      s0 = peg$currPos2;
                      if (input2.substr(peg$currPos2, 2) === peg$c92) {
                        s1 = peg$c92;
                        peg$currPos2 += 2;
                      } else {
                        s1 = peg$FAILED2;
                        if (peg$silentFails2 === 0) {
                          peg$fail2(peg$e132);
                        }
                      }
                      if (s1 !== peg$FAILED2) {
                        peg$savedPos2 = s0;
                        s1 = peg$f262();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED2) {
                        s0 = peg$currPos2;
                        if (input2.substr(peg$currPos2, 2) === peg$c102) {
                          s1 = peg$c102;
                          peg$currPos2 += 2;
                        } else {
                          s1 = peg$FAILED2;
                          if (peg$silentFails2 === 0) {
                            peg$fail2(peg$e142);
                          }
                        }
                        if (s1 !== peg$FAILED2) {
                          peg$savedPos2 = s0;
                          s1 = peg$f272();
                        }
                        s0 = s1;
                        if (s0 === peg$FAILED2) {
                          s0 = peg$currPos2;
                          s1 = peg$currPos2;
                          peg$silentFails2++;
                          if (input2.charCodeAt(peg$currPos2) === 92) {
                            s2 = peg$c112;
                            peg$currPos2++;
                          } else {
                            s2 = peg$FAILED2;
                            if (peg$silentFails2 === 0) {
                              peg$fail2(peg$e152);
                            }
                          }
                          peg$silentFails2--;
                          if (s2 === peg$FAILED2) {
                            s1 = void 0;
                          } else {
                            peg$currPos2 = s1;
                            s1 = peg$FAILED2;
                          }
                          if (s1 !== peg$FAILED2) {
                            if (input2.length > peg$currPos2) {
                              s2 = input2.charAt(peg$currPos2);
                              peg$currPos2++;
                            } else {
                              s2 = peg$FAILED2;
                              if (peg$silentFails2 === 0) {
                                peg$fail2(peg$e162);
                              }
                            }
                            if (s2 !== peg$FAILED2) {
                              peg$savedPos2 = s0;
                              s0 = peg$f282(s2);
                            } else {
                              peg$currPos2 = s0;
                              s0 = peg$FAILED2;
                            }
                          } else {
                            peg$currPos2 = s0;
                            s0 = peg$FAILED2;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parseChar2, "peg$parseChar");
        function peg$parseLEFTARROW() {
          var s0;
          if (input2.substr(peg$currPos2, 2) === peg$c122) {
            s0 = peg$c122;
            peg$currPos2 += 2;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e172);
            }
          }
          return s0;
        }
        __name(peg$parseLEFTARROW, "peg$parseLEFTARROW");
        function peg$parseSLASH() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 47) {
            s0 = peg$c132;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e182);
            }
          }
          return s0;
        }
        __name(peg$parseSLASH, "peg$parseSLASH");
        function peg$parseAND() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 38) {
            s0 = peg$c142;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e192);
            }
          }
          return s0;
        }
        __name(peg$parseAND, "peg$parseAND");
        function peg$parseNOT() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 33) {
            s0 = peg$c152;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e202);
            }
          }
          return s0;
        }
        __name(peg$parseNOT, "peg$parseNOT");
        function peg$parseQUESTION() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 63) {
            s0 = peg$c162;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e212);
            }
          }
          return s0;
        }
        __name(peg$parseQUESTION, "peg$parseQUESTION");
        function peg$parseSTAR() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 42) {
            s0 = peg$c172;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e222);
            }
          }
          return s0;
        }
        __name(peg$parseSTAR, "peg$parseSTAR");
        function peg$parsePLUS() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 43) {
            s0 = peg$c182;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e232);
            }
          }
          return s0;
        }
        __name(peg$parsePLUS, "peg$parsePLUS");
        function peg$parseOPEN() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 40) {
            s0 = peg$c192;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e242);
            }
          }
          return s0;
        }
        __name(peg$parseOPEN, "peg$parseOPEN");
        function peg$parseCLOSE() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 41) {
            s0 = peg$c202;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e252);
            }
          }
          return s0;
        }
        __name(peg$parseCLOSE, "peg$parseCLOSE");
        function peg$parseDOT() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 46) {
            s0 = peg$c212;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e262);
            }
          }
          return s0;
        }
        __name(peg$parseDOT, "peg$parseDOT");
        function peg$parseWS2() {
          var s0, s1;
          s0 = [];
          s1 = peg$parseSpace2();
          if (s1 === peg$FAILED2) {
            s1 = peg$parseComment2();
          }
          while (s1 !== peg$FAILED2) {
            s0.push(s1);
            s1 = peg$parseSpace2();
            if (s1 === peg$FAILED2) {
              s1 = peg$parseComment2();
            }
          }
          return s0;
        }
        __name(peg$parseWS2, "peg$parseWS");
        function peg$parseComment2() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos2;
          if (input2.charCodeAt(peg$currPos2) === 35) {
            s1 = peg$c222;
            peg$currPos2++;
          } else {
            s1 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e272);
            }
          }
          if (s1 !== peg$FAILED2) {
            s2 = [];
            s3 = peg$currPos2;
            s4 = peg$currPos2;
            peg$silentFails2++;
            s5 = peg$parseEndOfLine2();
            peg$silentFails2--;
            if (s5 === peg$FAILED2) {
              s4 = void 0;
            } else {
              peg$currPos2 = s4;
              s4 = peg$FAILED2;
            }
            if (s4 !== peg$FAILED2) {
              if (input2.length > peg$currPos2) {
                s5 = input2.charAt(peg$currPos2);
                peg$currPos2++;
              } else {
                s5 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e162);
                }
              }
              if (s5 !== peg$FAILED2) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            } else {
              peg$currPos2 = s3;
              s3 = peg$FAILED2;
            }
            while (s3 !== peg$FAILED2) {
              s2.push(s3);
              s3 = peg$currPos2;
              s4 = peg$currPos2;
              peg$silentFails2++;
              s5 = peg$parseEndOfLine2();
              peg$silentFails2--;
              if (s5 === peg$FAILED2) {
                s4 = void 0;
              } else {
                peg$currPos2 = s4;
                s4 = peg$FAILED2;
              }
              if (s4 !== peg$FAILED2) {
                if (input2.length > peg$currPos2) {
                  s5 = input2.charAt(peg$currPos2);
                  peg$currPos2++;
                } else {
                  s5 = peg$FAILED2;
                  if (peg$silentFails2 === 0) {
                    peg$fail2(peg$e162);
                  }
                }
                if (s5 !== peg$FAILED2) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos2 = s3;
                  s3 = peg$FAILED2;
                }
              } else {
                peg$currPos2 = s3;
                s3 = peg$FAILED2;
              }
            }
            s3 = peg$parseEndOfLine2();
            if (s3 !== peg$FAILED2) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos2 = s0;
              s0 = peg$FAILED2;
            }
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          return s0;
        }
        __name(peg$parseComment2, "peg$parseComment");
        function peg$parseSpace2() {
          var s0;
          if (input2.charCodeAt(peg$currPos2) === 32) {
            s0 = peg$c232;
            peg$currPos2++;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e282);
            }
          }
          if (s0 === peg$FAILED2) {
            if (input2.charCodeAt(peg$currPos2) === 9) {
              s0 = peg$c242;
              peg$currPos2++;
            } else {
              s0 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e292);
              }
            }
            if (s0 === peg$FAILED2) {
              s0 = peg$parseEndOfLine2();
            }
          }
          return s0;
        }
        __name(peg$parseSpace2, "peg$parseSpace");
        function peg$parseEndOfLine2() {
          var s0;
          if (input2.substr(peg$currPos2, 2) === peg$c252) {
            s0 = peg$c252;
            peg$currPos2 += 2;
          } else {
            s0 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e302);
            }
          }
          if (s0 === peg$FAILED2) {
            if (input2.charCodeAt(peg$currPos2) === 10) {
              s0 = peg$c262;
              peg$currPos2++;
            } else {
              s0 = peg$FAILED2;
              if (peg$silentFails2 === 0) {
                peg$fail2(peg$e312);
              }
            }
            if (s0 === peg$FAILED2) {
              if (input2.charCodeAt(peg$currPos2) === 13) {
                s0 = peg$c272;
                peg$currPos2++;
              } else {
                s0 = peg$FAILED2;
                if (peg$silentFails2 === 0) {
                  peg$fail2(peg$e322);
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parseEndOfLine2, "peg$parseEndOfLine");
        function peg$parseEndOfFile2() {
          var s0, s1;
          s0 = peg$currPos2;
          peg$silentFails2++;
          if (input2.length > peg$currPos2) {
            s1 = input2.charAt(peg$currPos2);
            peg$currPos2++;
          } else {
            s1 = peg$FAILED2;
            if (peg$silentFails2 === 0) {
              peg$fail2(peg$e162);
            }
          }
          peg$silentFails2--;
          if (s1 === peg$FAILED2) {
            s0 = void 0;
          } else {
            peg$currPos2 = s0;
            s0 = peg$FAILED2;
          }
          return s0;
        }
        __name(peg$parseEndOfFile2, "peg$parseEndOfFile");
        peg$result2 = peg$startRuleFunction2();
        if (peg$result2 !== peg$FAILED2 && peg$currPos2 === input2.length) {
          return peg$result2;
        } else {
          if (peg$result2 !== peg$FAILED2 && peg$currPos2 < input2.length) {
            peg$fail2(peg$endExpectation2());
          }
          throw peg$buildStructuredError2(
            peg$maxFailExpected2,
            peg$maxFailPos2 < input2.length ? input2.charAt(peg$maxFailPos2) : null,
            peg$maxFailPos2 < input2.length ? peg$computeLocation2(peg$maxFailPos2, peg$maxFailPos2 + 1) : peg$computeLocation2(peg$maxFailPos2, peg$maxFailPos2)
          );
        }
      }
      __name(peg$parse2, "peg$parse");
      module2.exports = {
        SyntaxError: peg$SyntaxError2,
        parse: peg$parse2
      };
    }
  });

  // src/frontends/pen/pen.pegjs
  var require_pen = __commonJS({
    "src/frontends/pen/pen.pegjs"(exports, module) {
      "use strict";
      function peg$subclass(child, parent) {
        function C() {
          this.constructor = child;
        }
        __name(C, "C");
        C.prototype = parent.prototype;
        child.prototype = new C();
      }
      __name(peg$subclass, "peg$subclass");
      function peg$SyntaxError(message, expected2, found, location2) {
        var self = Error.call(this, message);
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(self, peg$SyntaxError.prototype);
        }
        self.expected = expected2;
        self.found = found;
        self.location = location2;
        self.name = "SyntaxError";
        return self;
      }
      __name(peg$SyntaxError, "peg$SyntaxError");
      peg$subclass(peg$SyntaxError, Error);
      function peg$padEnd(str, targetLength, padString) {
        padString = padString || " ";
        if (str.length > targetLength) {
          return str;
        }
        targetLength -= str.length;
        padString += padString.repeat(targetLength);
        return str + padString.slice(0, targetLength);
      }
      __name(peg$padEnd, "peg$padEnd");
      peg$SyntaxError.prototype.format = function(sources) {
        var str = "Error: " + this.message;
        if (this.location) {
          var src = null;
          var k;
          for (k = 0; k < sources.length; k++) {
            if (sources[k].source === this.location.source) {
              src = sources[k].text.split(/\r\n|\n|\r/g);
              break;
            }
          }
          var s = this.location.start;
          var loc = this.location.source + ":" + s.line + ":" + s.column;
          if (src) {
            var e = this.location.end;
            var filler = peg$padEnd("", s.line.toString().length, " ");
            var line = src[s.line - 1];
            var last = s.line === e.line ? e.column : line.length + 1;
            var hatLen = last - s.column || 1;
            str += "\n --> " + loc + "\n" + filler + " |\n" + s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
          } else {
            str += "\n at " + loc;
          }
        }
        return str;
      };
      peg$SyntaxError.buildMessage = function(expected2, found) {
        var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return '"' + literalEscape(expectation.text) + '"';
          },
          class: function(expectation) {
            var escapedParts = expectation.parts.map(function(part) {
              return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
            });
            return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
          },
          any: function() {
            return "any character";
          },
          end: function() {
            return "end of input";
          },
          other: function(expectation) {
            return expectation.description;
          }
        };
        function hex(ch) {
          return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        __name(hex, "hex");
        function literalEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        __name(literalEscape, "literalEscape");
        function classEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        __name(classEscape, "classEscape");
        function describeExpectation(expectation) {
          return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        __name(describeExpectation, "describeExpectation");
        function describeExpected(expected3) {
          var descriptions = expected3.map(describeExpectation);
          var i, j;
          descriptions.sort();
          if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
              if (descriptions[i - 1] !== descriptions[i]) {
                descriptions[j] = descriptions[i];
                j++;
              }
            }
            descriptions.length = j;
          }
          switch (descriptions.length) {
            case 1:
              return descriptions[0];
            case 2:
              return descriptions[0] + " or " + descriptions[1];
            default:
              return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
          }
        }
        __name(describeExpected, "describeExpected");
        function describeFound(found2) {
          return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
        }
        __name(describeFound, "describeFound");
        return "Expected " + describeExpected(expected2) + " but " + describeFound(found) + " found.";
      };
      function peg$parse(input, options) {
        options = options !== void 0 ? options : {};
        var peg$FAILED = {};
        var peg$source = options.grammarSource;
        var peg$startRuleFunctions = { Grammar: peg$parseGrammar };
        var peg$startRuleFunction = peg$parseGrammar;
        var peg$c0 = "=";
        var peg$c1 = "|";
        var peg$c2 = "#";
        var peg$c3 = ".";
        var peg$c4 = "#x";
        var peg$c5 = '"';
        var peg$c6 = "'";
        var peg$c7 = "`";
        var peg$c8 = "{";
        var peg$c9 = ",";
        var peg$c10 = "}";
        var peg$c11 = "[";
        var peg$c12 = "]";
        var peg$c13 = "(";
        var peg$c14 = ")";
        var peg$c15 = ":";
        var peg$c16 = "...";
        var peg$c17 = "-";
        var peg$c18 = "\\";
        var peg$c19 = "\\u";
        var peg$c20 = "\\u{";
        var peg$c21 = "char";
        var peg$c22 = "false";
        var peg$c23 = "nil";
        var peg$c24 = "true";
        var peg$c25 = "__float";
        var peg$c26 = "__int";
        var peg$c27 = "__hex";
        var peg$c28 = "__parse";
        var peg$c29 = "__print";
        var peg$c30 = "//";
        var peg$c31 = " ";
        var peg$c32 = "	";
        var peg$c33 = "\r\n";
        var peg$c34 = "\n";
        var peg$c35 = "\r";
        var peg$r0 = /^[&!]/;
        var peg$r1 = /^[?*+]/;
        var peg$r2 = /^[=:]/;
        var peg$r3 = /^[0-9]/;
        var peg$r4 = /^['`]/;
        var peg$r5 = /^["`]/;
        var peg$r6 = /^['"]/;
        var peg$r7 = /^[a-zA-Z_]/;
        var peg$r8 = /^['"`[\r\n]/;
        var peg$r9 = /^[\]\r\n]/;
        var peg$r10 = /^[\0-\x1F]/;
        var peg$r11 = /^[\\'"`[]/;
        var peg$r12 = /^[bfnrtv\\'"`[]/;
        var peg$r13 = /^[0-9a-fA-F]/;
        var peg$e0 = peg$literalExpectation("=", false);
        var peg$e1 = peg$literalExpectation("|", false);
        var peg$e2 = peg$classExpectation(["&", "!"], false, false);
        var peg$e3 = peg$classExpectation(["?", "*", "+"], false, false);
        var peg$e4 = peg$classExpectation(["=", ":"], false, false);
        var peg$e5 = peg$literalExpectation("#", false);
        var peg$e6 = peg$classExpectation([["0", "9"]], false, false);
        var peg$e7 = peg$literalExpectation(".", false);
        var peg$e8 = peg$literalExpectation("#x", false);
        var peg$e9 = peg$literalExpectation('"', false);
        var peg$e10 = peg$classExpectation(["'", "`"], false, false);
        var peg$e11 = peg$literalExpectation("'", false);
        var peg$e12 = peg$classExpectation(['"', "`"], false, false);
        var peg$e13 = peg$literalExpectation("`", false);
        var peg$e14 = peg$classExpectation(["'", '"'], false, false);
        var peg$e15 = peg$literalExpectation("{", false);
        var peg$e16 = peg$literalExpectation(",", false);
        var peg$e17 = peg$literalExpectation("}", false);
        var peg$e18 = peg$literalExpectation("[", false);
        var peg$e19 = peg$literalExpectation("]", false);
        var peg$e20 = peg$literalExpectation("(", false);
        var peg$e21 = peg$literalExpectation(")", false);
        var peg$e22 = peg$literalExpectation(":", false);
        var peg$e23 = peg$literalExpectation("...", false);
        var peg$e24 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false);
        var peg$e25 = peg$classExpectation(["'", '"', "`", "[", "\r", "\n"], false, false);
        var peg$e26 = peg$classExpectation(["]", "\r", "\n"], false, false);
        var peg$e27 = peg$literalExpectation("-", false);
        var peg$e28 = peg$classExpectation([["\0", ""]], false, false);
        var peg$e29 = peg$classExpectation(["\\", "'", '"', "`", "["], false, false);
        var peg$e30 = peg$anyExpectation();
        var peg$e31 = peg$literalExpectation("\\", false);
        var peg$e32 = peg$classExpectation(["b", "f", "n", "r", "t", "v", "\\", "'", '"', "`", "["], false, false);
        var peg$e33 = peg$literalExpectation("\\u", false);
        var peg$e34 = peg$literalExpectation("\\u{", false);
        var peg$e35 = peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false);
        var peg$e36 = peg$literalExpectation("char", false);
        var peg$e37 = peg$literalExpectation("false", false);
        var peg$e38 = peg$literalExpectation("nil", false);
        var peg$e39 = peg$literalExpectation("true", false);
        var peg$e40 = peg$literalExpectation("__float", false);
        var peg$e41 = peg$literalExpectation("__int", false);
        var peg$e42 = peg$literalExpectation("__hex", false);
        var peg$e43 = peg$literalExpectation("__parse", false);
        var peg$e44 = peg$literalExpectation("__print", false);
        var peg$e45 = peg$literalExpectation("//", false);
        var peg$e46 = peg$literalExpectation(" ", false);
        var peg$e47 = peg$literalExpectation("	", false);
        var peg$e48 = peg$literalExpectation("\r\n", false);
        var peg$e49 = peg$literalExpectation("\n", false);
        var peg$e50 = peg$literalExpectation("\r", false);
        var peg$f0 = /* @__PURE__ */ __name(function(defns) {
          return { definitions: defns.map((defn) => defn[1]) };
        }, "peg$f0");
        var peg$f1 = /* @__PURE__ */ __name(function(lhs, rhs) {
          return { kind: "Definition", lhs, rhs };
        }, "peg$f1");
        var peg$f2 = /* @__PURE__ */ __name(function(h, t) {
          return !t.length ? h : { kind: "Choice", items: [h].concat(t.map((el) => el[3])), text: text() };
        }, "peg$f2");
        var peg$f3 = /* @__PURE__ */ __name(function(h, t) {
          return !t.length ? h : { kind: "Sequence", items: [h].concat(t.map((el) => el[1])), text: text() };
        }, "peg$f3");
        var peg$f4 = /* @__PURE__ */ __name(function(ops, expression) {
          return ops.reverse().reduce(
            (e, [op]) => ({ kind: "Lookahead", positive: op === "&", expression: e, text: `${op}(${e.text})` }),
            expression
          );
        }, "peg$f4");
        var peg$f5 = /* @__PURE__ */ __name(function(expression, ops) {
          return ops.reduce(
            (e, [_, op]) => {
              const kind = op === "?" ? "Optional" : op === "*" ? "ZeroOrMore" : "OneOrMore";
              return { kind, expression: e, text: `(${e.text})${op}` };
            },
            expression
          );
        }, "peg$f5");
        var peg$f6 = /* @__PURE__ */ __name(function(identifier) {
          return { kind: "Reference", identifier, text: text() };
        }, "peg$f6");
        var peg$f7 = /* @__PURE__ */ __name(function() {
          return { kind: "AnyChar", text: text() };
        }, "peg$f7");
        var peg$f8 = /* @__PURE__ */ __name(function() {
          return { kind: "Scalar", value: true, text: text() };
        }, "peg$f8");
        var peg$f9 = /* @__PURE__ */ __name(function() {
          return { kind: "Scalar", value: false, text: text() };
        }, "peg$f9");
        var peg$f10 = /* @__PURE__ */ __name(function() {
          return { kind: "Scalar", value: null, text: text() };
        }, "peg$f10");
        var peg$f11 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicFloat", text: text() };
        }, "peg$f11");
        var peg$f12 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicInt", text: text() };
        }, "peg$f12");
        var peg$f13 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicHex", text: text() };
        }, "peg$f13");
        var peg$f14 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicParse", text: text() };
        }, "peg$f14");
        var peg$f15 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicPrint", text: text() };
        }, "peg$f15");
        var peg$f16 = /* @__PURE__ */ __name(function(head, tail) {
          return { kind: "ByteList", items: (head !== void 0 ? [head] : []).concat(tail.map((el) => el[1])), text: text() };
        }, "peg$f16");
        var peg$f17 = /* @__PURE__ */ __name(function(head, tail) {
          return { kind: "ByteList", items: (head !== void 0 ? [head] : []).concat(tail.map((el) => el[1])), text: text() };
        }, "peg$f17");
        var peg$f18 = /* @__PURE__ */ __name(function(items) {
          return { kind: "StringX", items, text: text() };
        }, "peg$f18");
        var peg$f19 = /* @__PURE__ */ __name(function(items) {
          return { kind: "StringA", items, text: text() };
        }, "peg$f19");
        var peg$f20 = /* @__PURE__ */ __name(function(items) {
          return { kind: "StringC", items, text: text() };
        }, "peg$f20");
        var peg$f21 = /* @__PURE__ */ __name(function(head, tail) {
          const items = (head ? [head] : []).concat(tail.map((el) => el[3]));
          const labels = /* @__PURE__ */ new Set();
          for (const item of items) {
            if (item.kind !== "Field" || typeof item.label !== "string")
              continue;
            if (labels.has(item.label))
              return error(`Duplicate field label '${label}'`);
            labels.add(item.label);
          }
          return { kind: "Record", items, text: text() };
        }, "peg$f21");
        var peg$f22 = /* @__PURE__ */ __name(function(head, tail) {
          const items = (head ? [head] : []).concat(tail.map((el) => el[3]));
          return { kind: "List", items, text: text() };
        }, "peg$f22");
        var peg$f23 = /* @__PURE__ */ __name(function(expression) {
          return expression;
        }, "peg$f23");
        var peg$f24 = /* @__PURE__ */ __name(function(h, t) {
          return h + t.join("");
        }, "peg$f24");
        var peg$f25 = /* @__PURE__ */ __name(function(label2, expression) {
          return { kind: "Field", label: label2, expression };
        }, "peg$f25");
        var peg$f26 = /* @__PURE__ */ __name(function(label2, expression) {
          return { kind: "Field", label: label2, expression };
        }, "peg$f26");
        var peg$f27 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "Splice", expression };
        }, "peg$f27");
        var peg$f28 = /* @__PURE__ */ __name(function(cs) {
          return cs.map((el) => el[1]).join("");
        }, "peg$f28");
        var peg$f29 = /* @__PURE__ */ __name(function(items) {
          return items.map((el) => el[1]);
        }, "peg$f29");
        var peg$f30 = /* @__PURE__ */ __name(function(min, max) {
          if (max < min)
            expected(`${min} <= ${max} in range [${min}-${max}]`);
          return [min, max];
        }, "peg$f30");
        var peg$f31 = /* @__PURE__ */ __name(function(c2) {
          return [c2, c2];
        }, "peg$f31");
        var peg$f32 = /* @__PURE__ */ __name(function() {
          return text();
        }, "peg$f32");
        var peg$f33 = /* @__PURE__ */ __name(function(c) {
          return eval(`"${text()}"`);
        }, "peg$f33");
        var peg$f34 = /* @__PURE__ */ __name(function() {
          return eval(`"${text()}"`);
        }, "peg$f34");
        var peg$f35 = /* @__PURE__ */ __name(function(d) {
          return eval(`"${text()}"`);
        }, "peg$f35");
        var peg$f36 = /* @__PURE__ */ __name(function(min, max) {
          return [min, max];
        }, "peg$f36");
        var peg$f37 = /* @__PURE__ */ __name(function(min, max) {
          return [min, max];
        }, "peg$f37");
        var peg$f38 = /* @__PURE__ */ __name(function() {
          const v = parseInt(text(), 10);
          if (v > 255)
            expected("value in range 0..255");
          else
            return v;
        }, "peg$f38");
        var peg$f39 = /* @__PURE__ */ __name(function() {
          const v = parseInt(text(), 16);
          if (v > 255)
            expected("value in range 0..255");
          else
            return v;
        }, "peg$f39");
        var peg$currPos = 0;
        var peg$savedPos = 0;
        var peg$posDetailsCache = [{ line: 1, column: 1 }];
        var peg$maxFailPos = 0;
        var peg$maxFailExpected = [];
        var peg$silentFails = 0;
        var peg$result;
        if ("startRule" in options) {
          if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
          }
          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function text() {
          return input.substring(peg$savedPos, peg$currPos);
        }
        __name(text, "text");
        function offset() {
          return peg$savedPos;
        }
        __name(offset, "offset");
        function range() {
          return {
            source: peg$source,
            start: peg$savedPos,
            end: peg$currPos
          };
        }
        __name(range, "range");
        function location() {
          return peg$computeLocation(peg$savedPos, peg$currPos);
        }
        __name(location, "location");
        function expected(description, location2) {
          location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
          throw peg$buildStructuredError(
            [peg$otherExpectation(description)],
            input.substring(peg$savedPos, peg$currPos),
            location2
          );
        }
        __name(expected, "expected");
        function error(message, location2) {
          location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
          throw peg$buildSimpleError(message, location2);
        }
        __name(error, "error");
        function peg$literalExpectation(text2, ignoreCase) {
          return { type: "literal", text: text2, ignoreCase };
        }
        __name(peg$literalExpectation, "peg$literalExpectation");
        function peg$classExpectation(parts, inverted, ignoreCase) {
          return { type: "class", parts, inverted, ignoreCase };
        }
        __name(peg$classExpectation, "peg$classExpectation");
        function peg$anyExpectation() {
          return { type: "any" };
        }
        __name(peg$anyExpectation, "peg$anyExpectation");
        function peg$endExpectation() {
          return { type: "end" };
        }
        __name(peg$endExpectation, "peg$endExpectation");
        function peg$otherExpectation(description) {
          return { type: "other", description };
        }
        __name(peg$otherExpectation, "peg$otherExpectation");
        function peg$computePosDetails(pos) {
          var details = peg$posDetailsCache[pos];
          var p;
          if (details) {
            return details;
          } else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
              p--;
            }
            details = peg$posDetailsCache[p];
            details = {
              line: details.line,
              column: details.column
            };
            while (p < pos) {
              if (input.charCodeAt(p) === 10) {
                details.line++;
                details.column = 1;
              } else {
                details.column++;
              }
              p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
          }
        }
        __name(peg$computePosDetails, "peg$computePosDetails");
        function peg$computeLocation(startPos, endPos) {
          var startPosDetails = peg$computePosDetails(startPos);
          var endPosDetails = peg$computePosDetails(endPos);
          return {
            source: peg$source,
            start: {
              offset: startPos,
              line: startPosDetails.line,
              column: startPosDetails.column
            },
            end: {
              offset: endPos,
              line: endPosDetails.line,
              column: endPosDetails.column
            }
          };
        }
        __name(peg$computeLocation, "peg$computeLocation");
        function peg$fail(expected2) {
          if (peg$currPos < peg$maxFailPos) {
            return;
          }
          if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
          }
          peg$maxFailExpected.push(expected2);
        }
        __name(peg$fail, "peg$fail");
        function peg$buildSimpleError(message, location2) {
          return new peg$SyntaxError(message, null, null, location2);
        }
        __name(peg$buildSimpleError, "peg$buildSimpleError");
        function peg$buildStructuredError(expected2, found, location2) {
          return new peg$SyntaxError(
            peg$SyntaxError.buildMessage(expected2, found),
            expected2,
            found,
            location2
          );
        }
        __name(peg$buildStructuredError, "peg$buildStructuredError");
        function peg$parseGrammar() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$parseWS();
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parseWS();
          s5 = peg$parseDefinition();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parseWS();
              s5 = peg$parseDefinition();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseWS();
            s4 = peg$parseEndOfFile();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f0(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseGrammar, "peg$parseGrammar");
        function peg$parseDefinition() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$parseIdentifier();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            if (input.charCodeAt(peg$currPos) === 61) {
              s3 = peg$c0;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e0);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWS();
              s5 = peg$parseChoice();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f1(s1, s5);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseDefinition, "peg$parseDefinition");
        function peg$parsePrecedence1() {
          var s0;
          s0 = peg$parseReference();
          if (s0 === peg$FAILED) {
            s0 = peg$parseAnyChar();
            if (s0 === peg$FAILED) {
              s0 = peg$parseTrue();
              if (s0 === peg$FAILED) {
                s0 = peg$parseFalse();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseNil();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseIntrinsicFloat();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseIntrinsicInt();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseIntrinsicHex();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseIntrinsicParse();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parseIntrinsicPrint();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parseByteList();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parseStringX();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parseStringA();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parseStringC();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parseRecord();
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parseList();
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parseParenExpr();
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parsePrecedence1, "peg$parsePrecedence1");
        function peg$parseChoice() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8;
          s0 = peg$currPos;
          s1 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 124) {
            s2 = peg$c1;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseWS();
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 === peg$FAILED) {
            s1 = null;
          }
          s2 = peg$parseSequence();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$currPos;
            s5 = peg$parseWS();
            if (input.charCodeAt(peg$currPos) === 124) {
              s6 = peg$c1;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e1);
              }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parseWS();
              s8 = peg$parseSequence();
              if (s8 !== peg$FAILED) {
                s5 = [s5, s6, s7, s8];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 124) {
                s6 = peg$c1;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e1);
                }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parseWS();
                s8 = peg$parseSequence();
                if (s8 !== peg$FAILED) {
                  s5 = [s5, s6, s7, s8];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            }
            peg$savedPos = s0;
            s0 = peg$f2(s2, s3);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseChoice, "peg$parseChoice");
        function peg$parseSequence() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$parseUnaryPre();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parseWS();
            s5 = peg$parseUnaryPre();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parseWS();
              s5 = peg$parseUnaryPre();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            }
            peg$savedPos = s0;
            s0 = peg$f3(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseSequence, "peg$parseSequence");
        function peg$parseUnaryPre() {
          var s0, s1, s2, s3, s4;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$currPos;
          if (peg$r0.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e2);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseWS();
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            if (peg$r0.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWS();
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
          s2 = peg$parseUnaryPost();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f4(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseUnaryPre, "peg$parseUnaryPre");
        function peg$parseUnaryPost() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$parsePrecedence1();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parseWS();
            if (peg$r1.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e3);
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parseWS();
              if (peg$r1.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e3);
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            }
            peg$savedPos = s0;
            s0 = peg$f5(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseUnaryPost, "peg$parseUnaryPost");
        function peg$parseReference() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$parseIdentifier();
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$currPos;
            s4 = peg$parseWS();
            if (peg$r2.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e4);
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f6(s1);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseReference, "peg$parseReference");
        function peg$parseAnyChar() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_CHAR();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f7();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseAnyChar, "peg$parseAnyChar");
        function peg$parseTrue() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_TRUE();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f8();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseTrue, "peg$parseTrue");
        function peg$parseFalse() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_FALSE();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f9();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseFalse, "peg$parseFalse");
        function peg$parseNil() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_NIL();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f10();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseNil, "peg$parseNil");
        function peg$parseIntrinsicFloat() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUFLOAT();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f11();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicFloat, "peg$parseIntrinsicFloat");
        function peg$parseIntrinsicInt() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUINT();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f12();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicInt, "peg$parseIntrinsicInt");
        function peg$parseIntrinsicHex() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUHEX();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f13();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicHex, "peg$parseIntrinsicHex");
        function peg$parseIntrinsicParse() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUPARSE();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f14();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicParse, "peg$parseIntrinsicParse");
        function peg$parseIntrinsicPrint() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUPRINT();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f15();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicPrint, "peg$parseIntrinsicPrint");
        function peg$parseByteList() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c2;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            if (peg$r3.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e6);
              }
            }
            peg$silentFails--;
            if (s3 !== peg$FAILED) {
              peg$currPos = s2;
              s2 = void 0;
            } else {
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseByteRangeDec();
              if (s3 === peg$FAILED) {
                s3 = peg$parseByteDec();
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 46) {
                  s6 = peg$c3;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e7);
                  }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseByteRangeDec();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseByteDec();
                  }
                  if (s7 !== peg$FAILED) {
                    s6 = [s6, s7];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 46) {
                    s6 = peg$c3;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e7);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseByteRangeDec();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseByteDec();
                    }
                    if (s7 !== peg$FAILED) {
                      s6 = [s6, s7];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                }
                peg$savedPos = s0;
                s0 = peg$f16(s3, s4);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c4) {
              s1 = peg$c4;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e8);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parseByteRangeHex();
              if (s2 === peg$FAILED) {
                s2 = peg$parseByteHex();
              }
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 46) {
                  s5 = peg$c3;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e7);
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseByteRangeHex();
                  if (s6 === peg$FAILED) {
                    s6 = peg$parseByteHex();
                  }
                  if (s6 !== peg$FAILED) {
                    s5 = [s5, s6];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 46) {
                    s5 = peg$c3;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e7);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parseByteRangeHex();
                    if (s6 === peg$FAILED) {
                      s6 = peg$parseByteHex();
                    }
                    if (s6 !== peg$FAILED) {
                      s5 = [s5, s6];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                }
                peg$savedPos = s0;
                s0 = peg$f17(s2, s3);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
          return s0;
        }
        __name(peg$parseByteList, "peg$parseByteList");
        function peg$parseStringX() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c5;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e9);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseChars();
            if (s3 === peg$FAILED) {
              s3 = peg$parseCharClass();
              if (s3 === peg$FAILED) {
                if (peg$r4.test(input.charAt(peg$currPos))) {
                  s3 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e10);
                  }
                }
              }
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseChars();
              if (s3 === peg$FAILED) {
                s3 = peg$parseCharClass();
                if (s3 === peg$FAILED) {
                  if (peg$r4.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e10);
                    }
                  }
                }
              }
            }
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c5;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e9);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f18(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseStringX, "peg$parseStringX");
        function peg$parseStringA() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c6;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e11);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseChars();
            if (s3 === peg$FAILED) {
              s3 = peg$parseCharClass();
              if (s3 === peg$FAILED) {
                if (peg$r5.test(input.charAt(peg$currPos))) {
                  s3 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e12);
                  }
                }
              }
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseChars();
              if (s3 === peg$FAILED) {
                s3 = peg$parseCharClass();
                if (s3 === peg$FAILED) {
                  if (peg$r5.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e12);
                    }
                  }
                }
              }
            }
            if (input.charCodeAt(peg$currPos) === 39) {
              s3 = peg$c6;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e11);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f19(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseStringA, "peg$parseStringA");
        function peg$parseStringC() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 96) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e13);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseChars();
            if (s3 === peg$FAILED) {
              s3 = peg$parseCharClass();
              if (s3 === peg$FAILED) {
                if (peg$r6.test(input.charAt(peg$currPos))) {
                  s3 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e14);
                  }
                }
              }
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseChars();
              if (s3 === peg$FAILED) {
                s3 = peg$parseCharClass();
                if (s3 === peg$FAILED) {
                  if (peg$r6.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e14);
                    }
                  }
                }
              }
            }
            if (input.charCodeAt(peg$currPos) === 96) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e13);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f20(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseStringC, "peg$parseStringC");
        function peg$parseRecord() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c8;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e15);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            s3 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c9;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e16);
              }
            }
            peg$silentFails--;
            if (s4 === peg$FAILED) {
              s3 = void 0;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseField();
              if (s4 === peg$FAILED) {
                s4 = peg$parseSplice();
              }
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              s5 = [];
              s6 = peg$currPos;
              s7 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 44) {
                s8 = peg$c9;
                peg$currPos++;
              } else {
                s8 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e16);
                }
              }
              if (s8 === peg$FAILED) {
                s8 = null;
              }
              s9 = peg$parseWS();
              s10 = peg$parseField();
              if (s10 === peg$FAILED) {
                s10 = peg$parseSplice();
              }
              if (s10 !== peg$FAILED) {
                s7 = [s7, s8, s9, s10];
                s6 = s7;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parseWS();
                if (input.charCodeAt(peg$currPos) === 44) {
                  s8 = peg$c9;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e16);
                  }
                }
                if (s8 === peg$FAILED) {
                  s8 = null;
                }
                s9 = peg$parseWS();
                s10 = peg$parseField();
                if (s10 === peg$FAILED) {
                  s10 = peg$parseSplice();
                }
                if (s10 !== peg$FAILED) {
                  s7 = [s7, s8, s9, s10];
                  s6 = s7;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
              s6 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 44) {
                s7 = peg$c9;
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e16);
                }
              }
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              s8 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 125) {
                s9 = peg$c10;
                peg$currPos++;
              } else {
                s9 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e17);
                }
              }
              if (s9 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f21(s4, s5);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseRecord, "peg$parseRecord");
        function peg$parseList() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c11;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e18);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            s3 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c9;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e16);
              }
            }
            peg$silentFails--;
            if (s4 === peg$FAILED) {
              s3 = void 0;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseSplice();
              if (s4 === peg$FAILED) {
                s4 = peg$parseChoice();
              }
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              s5 = [];
              s6 = peg$currPos;
              s7 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 44) {
                s8 = peg$c9;
                peg$currPos++;
              } else {
                s8 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e16);
                }
              }
              if (s8 !== peg$FAILED) {
                s9 = peg$parseWS();
                s10 = peg$parseSplice();
                if (s10 === peg$FAILED) {
                  s10 = peg$parseChoice();
                }
                if (s10 !== peg$FAILED) {
                  s7 = [s7, s8, s9, s10];
                  s6 = s7;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parseWS();
                if (input.charCodeAt(peg$currPos) === 44) {
                  s8 = peg$c9;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e16);
                  }
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseWS();
                  s10 = peg$parseSplice();
                  if (s10 === peg$FAILED) {
                    s10 = peg$parseChoice();
                  }
                  if (s10 !== peg$FAILED) {
                    s7 = [s7, s8, s9, s10];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
              s6 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 44) {
                s7 = peg$c9;
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e16);
                }
              }
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              s8 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 93) {
                s9 = peg$c12;
                peg$currPos++;
              } else {
                s9 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e19);
                }
              }
              if (s9 !== peg$FAILED) {
                s10 = peg$currPos;
                peg$silentFails++;
                s11 = peg$currPos;
                s12 = peg$parseWS();
                if (peg$r2.test(input.charAt(peg$currPos))) {
                  s13 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s13 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e4);
                  }
                }
                if (s13 !== peg$FAILED) {
                  s12 = [s12, s13];
                  s11 = s12;
                } else {
                  peg$currPos = s11;
                  s11 = peg$FAILED;
                }
                peg$silentFails--;
                if (s11 === peg$FAILED) {
                  s10 = void 0;
                } else {
                  peg$currPos = s10;
                  s10 = peg$FAILED;
                }
                if (s10 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s0 = peg$f22(s4, s5);
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseList, "peg$parseList");
        function peg$parseParenExpr() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c13;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e20);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            s3 = peg$parseChoice();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c14;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e21);
                }
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f23(s3);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseParenExpr, "peg$parseParenExpr");
        function peg$parseIdentifier() {
          var s0, s1, s2, s3, s4;
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          s2 = peg$parseKeyword();
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = void 0;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseIdentStart();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseIdentCont();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseIdentCont();
              }
              peg$savedPos = s0;
              s0 = peg$f24(s2, s3);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseIdentifier, "peg$parseIdentifier");
        function peg$parseField() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c11;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e18);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            s3 = peg$parseChoice();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c12;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e19);
                }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseWS();
                if (input.charCodeAt(peg$currPos) === 58) {
                  s7 = peg$c15;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e22);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseWS();
                  s9 = peg$parseChoice();
                  if (s9 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f25(s3, s9);
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseIdentifier();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseWS();
              if (input.charCodeAt(peg$currPos) === 58) {
                s3 = peg$c15;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e22);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parseWS();
                s5 = peg$parseChoice();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s0 = peg$f26(s1, s5);
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
          return s0;
        }
        __name(peg$parseField, "peg$parseField");
        function peg$parseSplice() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c16) {
            s1 = peg$c16;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e23);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            s3 = peg$parseChoice();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f27(s3);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseSplice, "peg$parseSplice");
        function peg$parseIdentStart() {
          var s0;
          if (peg$r7.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e24);
            }
          }
          return s0;
        }
        __name(peg$parseIdentStart, "peg$parseIdentStart");
        function peg$parseIdentCont() {
          var s0;
          s0 = peg$parseIdentStart();
          if (s0 === peg$FAILED) {
            if (peg$r3.test(input.charAt(peg$currPos))) {
              s0 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e6);
              }
            }
          }
          return s0;
        }
        __name(peg$parseIdentCont, "peg$parseIdentCont");
        function peg$parseChars() {
          var s0, s1, s2, s3, s4;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          if (peg$r8.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e25);
            }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = void 0;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseChar();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$currPos;
              s3 = peg$currPos;
              peg$silentFails++;
              if (peg$r8.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e25);
                }
              }
              peg$silentFails--;
              if (s4 === peg$FAILED) {
                s3 = void 0;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parseChar();
                if (s4 !== peg$FAILED) {
                  s3 = [s3, s4];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f28(s1);
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseChars, "peg$parseChars");
        function peg$parseCharClass() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c11;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e18);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            if (peg$r9.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e26);
              }
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = void 0;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseCharRange();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                s4 = peg$currPos;
                peg$silentFails++;
                if (peg$r9.test(input.charAt(peg$currPos))) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e26);
                  }
                }
                peg$silentFails--;
                if (s5 === peg$FAILED) {
                  s4 = void 0;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseCharRange();
                  if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              }
            } else {
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s3 = peg$c12;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e19);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f29(s2);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseCharClass, "peg$parseCharClass");
        function peg$parseCharRange() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$parseChar();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s2 = peg$c17;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e27);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseChar();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f30(s1, s3);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseChar();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$f31(s1);
            }
            s0 = s1;
          }
          return s0;
        }
        __name(peg$parseCharRange, "peg$parseCharRange");
        function peg$parseChar() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          if (peg$r10.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e28);
            }
          }
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = void 0;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            if (peg$r11.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e29);
              }
            }
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e30);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f32();
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 92) {
              s1 = peg$c18;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e31);
              }
            }
            if (s1 !== peg$FAILED) {
              if (peg$r12.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e32);
                }
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f33(s2);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c19) {
                s1 = peg$c19;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e33);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseHexDigit();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseHexDigit();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseHexDigit();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseHexDigit();
                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s0 = peg$f34();
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 3) === peg$c20) {
                  s1 = peg$c20;
                  peg$currPos += 3;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e34);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = [];
                  s3 = peg$parseHexDigit();
                  if (s3 !== peg$FAILED) {
                    while (s3 !== peg$FAILED) {
                      s2.push(s3);
                      s3 = peg$parseHexDigit();
                    }
                  } else {
                    s2 = peg$FAILED;
                  }
                  if (s2 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s3 = peg$c10;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$e17);
                      }
                    }
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s0 = peg$f35(s2);
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parseChar, "peg$parseChar");
        function peg$parseByteRangeDec() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$parseByteDec();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s2 = peg$c17;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e27);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseByteDec();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f36(s1, s3);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseByteRangeDec, "peg$parseByteRangeDec");
        function peg$parseByteRangeHex() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$parseByteHex();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s2 = peg$c17;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e27);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseByteHex();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f37(s1, s3);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseByteRangeHex, "peg$parseByteRangeHex");
        function peg$parseByteDec() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = [];
          if (peg$r3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e6);
            }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$r3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e6);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f38();
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseByteDec, "peg$parseByteDec");
        function peg$parseByteHex() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseHexDigit();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseHexDigit();
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f39();
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseByteHex, "peg$parseByteHex");
        function peg$parseHexDigit() {
          var s0;
          if (peg$r13.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e35);
            }
          }
          return s0;
        }
        __name(peg$parseHexDigit, "peg$parseHexDigit");
        function peg$parseKeyword() {
          var s0;
          s0 = peg$parseK_CHAR();
          if (s0 === peg$FAILED) {
            s0 = peg$parseK_FALSE();
            if (s0 === peg$FAILED) {
              s0 = peg$parseK_NIL();
              if (s0 === peg$FAILED) {
                s0 = peg$parseK_TRUE();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseK_UUFLOAT();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseK_UUINT();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseK_UUHEX();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseK_UUPARSE();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseK_UUPRINT();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parseKeyword, "peg$parseKeyword");
        function peg$parseK_CHAR() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c21) {
            s1 = peg$c21;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e36);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_CHAR, "peg$parseK_CHAR");
        function peg$parseK_FALSE() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e37);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_FALSE, "peg$parseK_FALSE");
        function peg$parseK_NIL() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c23) {
            s1 = peg$c23;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e38);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_NIL, "peg$parseK_NIL");
        function peg$parseK_TRUE() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c24) {
            s1 = peg$c24;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e39);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_TRUE, "peg$parseK_TRUE");
        function peg$parseK_UUFLOAT() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 7) === peg$c25) {
            s1 = peg$c25;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e40);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_UUFLOAT, "peg$parseK_UUFLOAT");
        function peg$parseK_UUINT() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c26) {
            s1 = peg$c26;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e41);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_UUINT, "peg$parseK_UUINT");
        function peg$parseK_UUHEX() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c27) {
            s1 = peg$c27;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e42);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_UUHEX, "peg$parseK_UUHEX");
        function peg$parseK_UUPARSE() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 7) === peg$c28) {
            s1 = peg$c28;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e43);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_UUPARSE, "peg$parseK_UUPARSE");
        function peg$parseK_UUPRINT() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 7) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e44);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseIdentCont();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseK_UUPRINT, "peg$parseK_UUPRINT");
        function peg$parseWS() {
          var s0, s1;
          s0 = [];
          s1 = peg$parseSpace();
          if (s1 === peg$FAILED) {
            s1 = peg$parseComment();
          }
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseSpace();
            if (s1 === peg$FAILED) {
              s1 = peg$parseComment();
            }
          }
          return s0;
        }
        __name(peg$parseWS, "peg$parseWS");
        function peg$parseComment() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c30) {
            s1 = peg$c30;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e45);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseEndOfLine();
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = void 0;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e30);
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$currPos;
              peg$silentFails++;
              s5 = peg$parseEndOfLine();
              peg$silentFails--;
              if (s5 === peg$FAILED) {
                s4 = void 0;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
              if (s4 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e30);
                  }
                }
                if (s5 !== peg$FAILED) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            }
            s3 = peg$parseEndOfLine();
            if (s3 !== peg$FAILED) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseComment, "peg$parseComment");
        function peg$parseSpace() {
          var s0;
          if (input.charCodeAt(peg$currPos) === 32) {
            s0 = peg$c31;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e46);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 9) {
              s0 = peg$c32;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e47);
              }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parseEndOfLine();
            }
          }
          return s0;
        }
        __name(peg$parseSpace, "peg$parseSpace");
        function peg$parseEndOfLine() {
          var s0;
          if (input.substr(peg$currPos, 2) === peg$c33) {
            s0 = peg$c33;
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e48);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
              s0 = peg$c34;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e49);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 13) {
                s0 = peg$c35;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e50);
                }
              }
            }
          }
          return s0;
        }
        __name(peg$parseEndOfLine, "peg$parseEndOfLine");
        function peg$parseEndOfFile() {
          var s0, s1;
          s0 = peg$currPos;
          peg$silentFails++;
          if (input.length > peg$currPos) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e30);
            }
          }
          peg$silentFails--;
          if (s1 === peg$FAILED) {
            s0 = void 0;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseEndOfFile, "peg$parseEndOfFile");
        peg$result = peg$startRuleFunction();
        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
        } else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
          }
          throw peg$buildStructuredError(
            peg$maxFailExpected,
            peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
            peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
          );
        }
      }
      __name(peg$parse, "peg$parse");
      module.exports = {
        SyntaxError: peg$SyntaxError,
        parse: peg$parse
      };
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    penc: () => penc
  });
  

  // src/analysis/bulk-rename.ts
  function bulkRename(pil, cb) {
    const changes = /* @__PURE__ */ new Map();
    for (const oldName of Object.keys(pil.rules)) {
      const newName = cb(oldName);
      if (newName === oldName)
        continue;
      changes.set(oldName, newName);
    }
    const rules = {};
    for (const [oldName, oldRule] of Object.entries(pil.rules)) {
      const newName = changes.get(oldName);
      const newArgs = oldRule.args.map((arg) => {
        if (arg.kind !== "Ref" || !changes.has(arg.name))
          return arg;
        return { kind: "Ref", name: changes.get(arg.name) };
      });
      const newRule = { ...oldRule, args: newArgs };
      rules[newName ?? oldName] = newRule;
    }
    return { rules };
  }
  __name(bulkRename, "bulkRename");

  // src/analysis/check-names.ts
  function checkNames(pil) {
    if (!pil.rules.start) {
      throw new Error(`'start' rule not found`);
    }
    for (const [ruleName, { args }] of Object.entries(pil.rules)) {
      for (const arg of args) {
        if (arg.kind !== "Ref")
          continue;
        if (!!pil.rules[arg.name])
          continue;
        throw new Error(`'${arg.name}' rule is not defined (referenced from rule '${ruleName}')`);
      }
    }
  }
  __name(checkNames, "checkNames");

  // src/utils/memoise.ts
  function memoise({ calculate, onRecurse }) {
    const memoisedResults = /* @__PURE__ */ new Map();
    return (arg) => {
      if (!memoisedResults.has(arg)) {
        memoisedResults.set(arg, CALCULATING);
        const result2 = calculate(arg);
        memoisedResults.set(arg, result2);
        return result2;
      }
      let result = memoisedResults.get(arg);
      if (result === CALCULATING) {
        if (!onRecurse)
          throw new Error("Infinite recursion detected");
        const result2 = onRecurse(arg);
        memoisedResults.set(arg, result2);
        return result2;
      }
      return result;
    };
  }
  __name(memoise, "memoise");
  var CALCULATING = Symbol("CALCULATING");

  // src/analysis/find-epsilon-deriving-rules.ts
  function findEpsilonDerivingRules({ pil, mode }) {
    const isEpsilonDeriving = memoise({
      onRecurse: () => false,
      calculate(ruleName) {
        const rule = pil.rules[ruleName];
        switch (rule.kind) {
          case "assertion":
          case "negation":
          case "is.parse":
          case "is.print":
            return true;
          case "utf8.char":
          case "utf8.float":
          case "utf8.int":
          case "utf8.uechar":
            return false;
          case "utf8.string":
            return rule.args[0].value.length === 0;
          case "byte":
            return mode === "print";
          case "char":
          case "scalar":
            return mode === "parse";
          case "string":
            return mode === "parse" || rule.args[0].value.length === 0;
          case "iteration": {
            const [range2, ref] = rule.args;
            const min = range2.kind === "Const" ? range2.value : range2.min ?? 0;
            return min === 0 || isEpsilonDeriving(ref.name);
          }
          case "list":
          case "record":
            if (mode === "print")
              return rule.args.length === 0;
          case "sequence":
            return rule.args.every((ref) => isEpsilonDeriving(ref.name));
          case "selection":
            return rule.args.some((ref) => isEpsilonDeriving(ref.name));
        }
      }
    });
    return new Set(Object.keys(pil.rules).filter(isEpsilonDeriving));
  }
  __name(findEpsilonDerivingRules, "findEpsilonDerivingRules");

  // src/analysis/find-left-recursive-head-rules.ts
  function findLeftRecursiveHeadRules({ pil, mode, epsilonDerivingRules }) {
    const leftRecursiveHeads = /* @__PURE__ */ new Set();
    const path = ["start"];
    traverse();
    function traverse() {
      const adjacents = getRulesDirectlyReachableAtSameInputPosition(path.at(-1));
      for (let adjacent of adjacents) {
        const ix = path.indexOf(adjacent);
        if (ix === -1) {
          path.push(adjacent);
          traverse();
          path.pop();
        } else {
          leftRecursiveHeads.add(adjacent);
        }
      }
    }
    __name(traverse, "traverse");
    return leftRecursiveHeads;
    function getRulesDirectlyReachableAtSameInputPosition(ruleName) {
      const rule = pil.rules[ruleName];
      switch (rule.kind) {
        case "byte":
        case "char":
        case "is.parse":
        case "is.print":
        case "scalar":
        case "string":
        case "utf8.char":
        case "utf8.float":
        case "utf8.int":
        case "utf8.string":
        case "utf8.uechar":
          return [];
        case "assertion":
        case "negation":
          return [rule.args[0].name];
        case "iteration": {
          const [range2, ref] = rule.args;
          const max = range2.kind === "Const" ? range2.value : range2.max ?? Infinity;
          return max > 0 ? [ref.name] : [];
        }
        case "list":
        case "record":
          if (mode === "print")
            return [];
        case "sequence": {
          const result = [];
          for (const ref of rule.args) {
            result.push(ref.name);
            if (!epsilonDerivingRules.has(ref.name))
              break;
          }
          return result;
        }
        case "selection":
          return rule.args.map(({ name }) => name);
      }
    }
    __name(getRulesDirectlyReachableAtSameInputPosition, "getRulesDirectlyReachableAtSameInputPosition");
  }
  __name(findLeftRecursiveHeadRules, "findLeftRecursiveHeadRules");

  // src/analysis/reorder-rules.ts
  function reorderRules(pil, preferredOrder) {
    preferredOrder ?? (preferredOrder = []);
    if (!preferredOrder.includes("start"))
      preferredOrder = ["start", ...preferredOrder];
    const orderedRuleNames = /* @__PURE__ */ new Set();
    preferredOrder.forEach(visit);
    const rules = Object.fromEntries([...orderedRuleNames].map((name) => [name, pil.rules[name]]));
    return { rules };
    function visit(ruleName) {
      orderedRuleNames.add(ruleName);
      for (const arg of pil.rules[ruleName].args) {
        if (!arg || typeof arg !== "object" || arg.kind !== "Ref")
          continue;
        const referencedRuleName = arg.name;
        if (orderedRuleNames.has(referencedRuleName))
          continue;
        if (preferredOrder?.includes(referencedRuleName))
          continue;
        visit(referencedRuleName);
      }
    }
    __name(visit, "visit");
  }
  __name(reorderRules, "reorderRules");

  // src/backends/js/emit-assertion.ts
  var emitAssertion = /* @__PURE__ */ __name((name, rule, _mode) => {
    const target = rule.args[0];
    return `
          function ${name}() {
              var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
              var result = ${target.name}();
              IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
              return result;
          }
      `;
  }, "emitAssertion");

  // src/backends/js/utils.ts
  var hexLit = /* @__PURE__ */ __name((n) => `0x${n.toString(16).padStart(2, "0")}`, "hexLit");
  function isEveryRuleOfKind(rules, kind) {
    return rules.every((rule) => rule.kind === kind);
  }
  __name(isEveryRuleOfKind, "isEveryRuleOfKind");

  // src/backends/js/emit-byte.ts
  var emitByte = /* @__PURE__ */ __name((name, rule, mode) => {
    const min = rule.args[0].kind === "Range" ? rule.args[0].min : rule.args[0].value;
    const max = rule.args[0].kind === "Range" ? rule.args[0].max : rule.args[0].value;
    const cond = min === null ? max === null ? "" : `b > ${hexLit(max)}` : max === null ? `b < ${hexLit(min)}` : min === max ? `b !== ${hexLit(min)}` : `b < ${hexLit(min)} || b > ${hexLit(max)}`;
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      if (IPOS >= ILEN) return false;
                      var b = IN[IPOS];
                      ${cond ? `if (${cond}) return false;` : ""}
                      IPOS += 1;
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      OUT[OPOS++] = ${hexLit(min ?? 0)};
                      return true;
                  }
              `;
    }
  }, "emitByte");

  // src/backends/js/emit-char.ts
  var emitChar = /* @__PURE__ */ __name((name, rule, mode) => {
    const min = rule.args[0].kind === "Range" ? rule.args[0].min : rule.args[0].value;
    const max = rule.args[0].kind === "Range" ? rule.args[0].max : rule.args[0].value;
    const cond = min === null ? max === null ? "" : `cp > ${hexLit(max)}` : max === null ? `cp < ${hexLit(min)}` : min === max ? `cp !== ${hexLit(min)}` : `cp < ${hexLit(min)} || cp > ${hexLit(max)}`;
    const isAscii = max !== null && max < 128;
    switch (mode) {
      case "parse":
        const cp = min ?? 0;
        return `
                  function ${name}() {
                      OUT[OPOS++] = ${hexLit(cp)};
                      TYPE |= ${cp < 55296 ? "STRING_FAST" : "STRING"};
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== STRING || IPOS >= ILEN) return false;
                      var cp = IN[IPOS];
                      ${cond ? `if (${cond}) return false;` : ""}
                      ${isAscii ? `OUT[OPOS++] = cp;` : `writeUtf8Codepoint(cp);`}
                      IPOS += 1;
                      return true;
                  }
              `;
    }
  }, "emitChar");

  // src/backends/js/emit-is-x.ts
  var emitIsX = /* @__PURE__ */ __name((name, rule, mode) => {
    return `
          function ${name}() {
              return ${rule.kind === "is.parse" === (mode === "parse")};
          }
      `;
  }, "emitIsX");

  // src/backends/js/emit-iteration.ts
  var NO_CONSUME_LIMIT = 100;
  var emitIteration = /* @__PURE__ */ __name((name, rule, _mode, lookup) => {
    const min = rule.args[0].kind === "Range" ? rule.args[0].min || 0 : rule.args[0].value;
    const max = rule.args[0].kind === "Range" ? rule.args[0].max || Infinity : rule.args[0].value;
    const target = rule.args[1];
    if (min === 0 && max === 1) {
      return `
              function ${name}() {
                  return ${target.name}() || true;
              }
          `;
    }
    if (min === 0 && max === Infinity && lookup(target.name).alwaysConsumes) {
      return `
              function ${name}() {
                  while (${target.name}()) ;
                  return true;
              }
          `;
    }
    return `
          function ${name}() {
              ${min || max ? `
                  var IPOSₒ = IPOS${min > 1 ? ", OPOSₒ = OPOS, TYPEₒ = TYPE" : ""};
              ` : ""}
              ${min > 8 ? `
                  for (var count = 0; count < ${min}; ++count) {
                      if (${target.name}()) continue;
                      return IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ, false;
                  }
              ` : min ? `
                  if (!${target.name}()${` || !${target.name}()`.repeat(min - 1)}) {
                      return ${min > 1 ? "IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ, " : ""}false;
                  }
              ` : ""}
              ${max > min ? `
                  for (${min > 8 ? "" : `var count = ${min}`}; ${max < Infinity ? `count < ${max} && ` : ""}${target.name}(); ++count) {
                      $assert(IPOS > IPOSₒ || count <= ${NO_CONSUME_LIMIT}, 'Infinite non-consuming iteration detected');
                  }
              ` : ""}
              return true;
          }
      `;
  }, "emitIteration");

  // src/backends/js/emit-leftrec.ts
  var emitLeftrec = /* @__PURE__ */ __name((name, rule, _mode, lookup) => {
    const target = rule.args[0];
    const targetKind = lookup(target.name).rule.kind;
    if (targetKind === "selection" || targetKind === "sequence")
      return `var ${name} = createLeftrec(${target.name});`;
    return `var ${name} = createLeftrec(() => ${target.name}());`;
  }, "emitLeftrec");

  // src/backends/js/emit-list.ts
  var emitList = /* @__PURE__ */ __name((name, rule, mode) => {
    const targets = rule.args;
    const isMultiElem = targets.length > 1;
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      ${isMultiElem ? "var IPOSₒ = IPOS, OPOSₒ = OPOS;" : ""}
                      ${targets.map((target) => `
                          if (!parseValue(${target.name})) return ${isMultiElem ? "IPOS = IPOSₒ, OPOS = OPOSₒ, " : ""}false;
                      `).join("")}
                      TYPE |= LIST;
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== LIST) return false;
                      ${isMultiElem ? "var IPOSₒ = IPOS, OPOSₒ = OPOS;" : ""}
                      ${targets.map((target) => `
                          if (!printValue(${target.name})) return ${isMultiElem ? "IPOS = IPOSₒ, OPOS = OPOSₒ, " : ""}false;
                          `).join("")}
                      return true;
                  }
              `;
    }
  }, "emitList");

  // src/backends/js/emit-negation.ts
  var emitNegation = /* @__PURE__ */ __name((name, rule, _mode) => {
    const target = rule.args[0];
    return `
          function ${name}() {
              var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
              var result = !${target.name}();
              IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
              return result;
          }
      `;
  }, "emitNegation");

  // src/backends/js/emit-record.ts
  var emitRecord = /* @__PURE__ */ __name((name, rule, mode, lookup) => {
    const fields = [];
    for (let i = 0; i < rule.args.length; i += 2) {
      fields.push({
        label: { name: rule.args[i].name, rule: lookup(rule.args[i].name).rule },
        value: rule.args[i + 1]
      });
    }
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      ${fields.length > 0 ? "var IPOSₒ = IPOS, OPOSₒ = OPOS;" : ""}
                      ${fields.map(({ label: label2, value }, i) => `
                          // Parse field label (${i + 1} of ${fields.length})
                          ${label2.rule.kind === "string" ? `
                              OUT[OPOS++] = ${JSON.stringify(label2.rule.args[0].value)};
                          ` : `
                              if (!parseValue(${label2.name})) {
                                  return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
                              }
                              $assert(typeof OUT[OPOS - 1] === 'string');
                          `}

                          // Parse field value (${i + 1} of ${fields.length})
                          if (!parseValue(${value.name})) {
                              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
                          }
                      `).join("")}
                      TYPE |= RECORD;
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== RECORD) return false;
                      ${fields.length > 0 ? `
                          var IPOSₒ = IPOS, OPOSₒ = OPOS;
                          var i;
                      ` : ""}

                      ${fields.map(({ label: label2, value }, i) => `
                          // Print field label (${i + 1} of ${fields.length})
                          ${label2.rule.kind === "string" ? `
                              for (i = IPOS; i < ILEN && IN[i] !== ${JSON.stringify(label2.rule.args[0].value)}; i += 2) ;
                              if (i >= ILEN) return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
                              [IN[i], IN[i + 1], IN[IPOS], IN[IPOS + 1]] = [IN[IPOS], IN[IPOS + 1], IN[i], IN[i + 1]];
                              IPOS += 1;
                          ` : `${/* TODO: This only ever matches the 'next' field - generalise to try every field like above? */
        ""}
                              if (!printValue(${label2.name})) {
                                  return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
                              }
                          `}

                          // Print field value (${i + 1} of ${fields.length})
                          if (!printValue(${value.name})) {
                              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
                          }
                      `).join("")}
                      return true;
                  }
              `;
    }
  }, "emitRecord");

  // src/backends/js/emit-runtime-library.ts
  function emitRuntimeLibrary() {
    if (1 < 2)
      return sourceCodeBetweenStartAndEndDelimiters();
    "$START$";
    var IN;
    var IPOS;
    var ILEN;
    var OUT;
    var OPOS;
    var TYPE = 0;
    var NOTHING = 0;
    var SCALAR = 1;
    var STRING = 6;
    var STRING_FAST = 4;
    var LIST = 8;
    var RECORD = 16;
    var DYNAMIC = 31;
    var DEFAULT_BUFFER_SIZE = 2 ** 22;
    function $assert(value, message) {
      if (value)
        return;
      throw new Error(`Assertion failed: ${message !== null && message !== void 0 ? message : "no further details"}`);
    }
    __name($assert, "$assert");
    var onReset = [];
    function $parse(stringOrBytes) {
      if (typeof stringOrBytes === "string") {
        OUT = new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
        for (var char of stringOrBytes)
          writeUtf8Codepoint(char.codePointAt(0));
        if (OPOS > OUT.length)
          throw new Error("input buffer too small");
        IN = OUT;
        ILEN = OPOS;
      } else {
        IN = stringOrBytes;
        ILEN = IN.length;
      }
      OUT = [];
      IPOS = 0;
      OPOS = 0;
      onReset.forEach((cb) => cb());
      if (!parseValue(ᝍstartᐅ))
        throw new Error("parse failed");
      if (IPOS !== ILEN)
        throw new Error("parse did not consume entire input");
      if (OPOS !== 1)
        throw new Error("parse did not produce a singular value");
      return OUT[0];
    }
    __name($parse, "$parse");
    function parseValue(rule) {
      var OPOSₒ = OPOS, TYPEₒ = TYPE;
      TYPE = NOTHING;
      if (!rule())
        return TYPE = TYPEₒ, false;
      $assert(TYPE !== NOTHING, "rule did not produce a value");
      if (TYPE === STRING_FAST && OPOS - OPOSₒ >= 65536)
        TYPE = STRING;
      switch (TYPE) {
        case SCALAR:
          $assert(OPOS === OPOSₒ + 1);
          break;
        case STRING:
          for (var str = "", i = OPOSₒ; i < OPOS; i += 65536) {
            str += String.fromCodePoint.apply(String, OUT.slice(i, Math.min(i + 65536, OPOS)));
          }
          OUT[OPOSₒ] = str;
          break;
        case STRING_FAST:
          OUT[OPOSₒ] = String.fromCharCode.apply(String, OUT.slice(OPOSₒ, OPOS));
          break;
        case LIST:
          OUT[OPOSₒ] = OUT.slice(OPOSₒ, OPOS);
          break;
        case RECORD:
          var obj = {};
          for (var i = OPOSₒ; i < OPOS; i += 2) {
            var label2 = OUT[i];
            $assert(!obj.hasOwnProperty(label2), `Duplicate label '${label2}' in record`);
            obj[label2] = OUT[i + 1];
          }
          OUT[OPOSₒ] = obj;
          break;
        case DYNAMIC:
          throw new Error("not implemented");
        default:
          ((type) => $assert(false, `Unhandled type ${type}`))(TYPE);
      }
      OPOS = OPOSₒ + 1;
      TYPE = TYPEₒ;
      return true;
    }
    __name(parseValue, "parseValue");
    function $print(value, outputBytes) {
      IN = [value];
      OUT = outputBytes ?? new Uint8Array(DEFAULT_BUFFER_SIZE);
      IPOS = 0;
      ILEN = 1;
      OPOS = 0;
      onReset.forEach((cb) => cb());
      if (!printValue(ᐊstartᝍ))
        throw new Error("print failed");
      if (OPOS > OUT.length)
        throw new Error("output buffer too small");
      if (outputBytes)
        return OPOS;
      IN = OUT, IPOS = 0, ILEN = OPOS;
      var codepoints = [], string = "";
      while (IPOS < ILEN) {
        var cp = readUtf8Codepoint();
        if (cp === -1)
          throw new Error("output buffer is not valid utf-8");
        if (codepoints.push(cp) >= 65536 || IPOS >= ILEN) {
          string += String.fromCodePoint.apply(String, codepoints);
          codepoints.length = 0;
        }
      }
      return string;
    }
    __name($print, "$print");
    function printValue(rule) {
      if (IPOS >= ILEN)
        return false;
      var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN, TYPEₒ = TYPE;
      var value = IN[IPOS];
      $assert(value !== void 0, `'undefined' is not a valid value in an AST`);
      if (value === null || value === true || value === false || typeof value === "number") {
        TYPE = SCALAR;
        var result = rule();
        TYPE = TYPEₒ;
        $assert(!result || IPOS === IPOSₒ + 1);
        return result;
      }
      if (typeof value === "string") {
        TYPE = STRING;
        IN = [];
        for (var i = 0; i < value.length; ++i) {
          var cp = value.charCodeAt(i);
          IN.push(cp);
          if (cp < 55296 || cp >= 57344)
            continue;
          IN[IN.length - 1] = value.codePointAt(i++);
        }
      } else if (Array.isArray(value)) {
        TYPE = LIST;
        IN = value;
      } else if (typeof value === "object") {
        TYPE = RECORD;
        IN = [];
        var objKeys = Object.keys(value);
        for (var i = 0; i < objKeys.length; ++i)
          IN.push(objKeys[i], value[objKeys[i]]);
      } else {
        throw new Error(`Unsupported value type for value ${value}`);
      }
      IPOS = 0;
      ILEN = IN.length;
      var result = rule();
      var IPOSᐟ = IPOS, ILENᐟ = ILEN;
      IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ, TYPE = TYPEₒ;
      if (!result)
        return false;
      if (IPOSᐟ !== ILENᐟ)
        return false;
      IPOS += 1;
      return true;
    }
    __name(printValue, "printValue");
    function createLeftrec(rule) {
      var saved;
      return /* @__PURE__ */ __name(function leftrec() {
        if (saved?.IN === IN && saved.IPOS === IPOS && (TYPE === NOTHING || TYPE === saved.TYPE)) {
          TYPE |= saved.TYPE;
          IPOS += saved.ΔIPOS;
          for (var i = 0; i < saved.ΔOUT.length; ++i)
            OUT[OPOS++] = saved.ΔOUT[i];
          return saved.result;
        }
        var savedₒ = saved, result = false;
        saved = { IN, IPOS, result, TYPE, ΔIPOS: 0, ΔOUT: [] };
        var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
        while (true) {
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          result = rule();
          if (result && (!saved.result || IPOS - IPOSₒ > saved.ΔIPOS)) {
            saved.result = result;
            saved.TYPE = TYPE;
            saved.ΔIPOS = IPOS - IPOSₒ;
            saved.ΔOUT = OUT.slice(OPOSₒ, OPOS);
            continue;
          }
          IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
          leftrec();
          saved = savedₒ;
          return result;
        }
      }, "leftrec");
    }
    __name(createLeftrec, "createLeftrec");
    function readUtf8Codepoint() {
      $assert(IN instanceof Uint8Array);
      var unread = ILEN - IPOS;
      if (unread < 1)
        return -1;
      var cp = IN[IPOS];
      var byteCount = UTF8_BYTE_COUNT[cp >> 3];
      if (byteCount === 0 || unread < byteCount)
        return -1;
      cp &= UTF8_BYTE1_MASK[byteCount];
      for (var i = 1; i < byteCount; ++i) {
        var nextByte = IN[IPOS + i];
        if ((nextByte & 192) !== 128)
          return -1;
        cp = (cp << 6) + (nextByte & 63);
      }
      if (cp < UTF8_MIN_CODEPOINT[byteCount] || cp > UTF8_MAX_CODEPOINT[byteCount])
        return -1;
      IPOS += byteCount;
      return cp;
    }
    __name(readUtf8Codepoint, "readUtf8Codepoint");
    function writeUtf8Codepoint(cp) {
      if (cp < 128) {
        OUT[OPOS++] = cp;
      } else if (cp < 2048) {
        OUT[OPOS++] = 192 | cp >> 6;
        OUT[OPOS++] = 128 | cp & 63;
      } else if (cp < 65536) {
        OUT[OPOS++] = 224 | cp >> 12;
        OUT[OPOS++] = 128 | cp >> 6 & 63;
        OUT[OPOS++] = 128 | cp & 63;
      } else {
        OUT[OPOS++] = 240 | cp >> 18;
        OUT[OPOS++] = 128 | cp >> 12 & 63;
        OUT[OPOS++] = 128 | cp >> 6 & 63;
        OUT[OPOS++] = 128 | cp & 63;
      }
    }
    __name(writeUtf8Codepoint, "writeUtf8Codepoint");
    var UTF8_BYTE_COUNT = [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 00xxx
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 01xxx
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 10xxx
      2,
      2,
      2,
      2,
      3,
      3,
      4,
      0
      // 11000 11001 11010 11011 11100 11101 11110 11111
    ];
    var UTF8_BYTE1_MASK = [0, 255, 31, 15, 7];
    var UTF8_MIN_CODEPOINT = [0, 0, 128, 2048, 65536];
    var UTF8_MAX_CODEPOINT = [0, 127, 2047, 65535, 1114111];
    function parseUtf8Float() {
      $assert(IN instanceof Uint8Array);
      var IPOSₒ = IPOS, IPOSᐟ;
      var cc = IN[IPOS];
      if (cc === 43 || cc === 45)
        cc = IN[++IPOS];
      IPOSᐟ = IPOS;
      while (cc >= 48 && cc <= 57)
        cc = IN[++IPOS];
      if (IPOSᐟ === IPOS)
        return IPOS = IPOSₒ, false;
      if (cc === 46) {
        cc = IN[++IPOS];
        IPOSᐟ = IPOS;
        while (cc >= 48 && cc <= 57)
          cc = IN[++IPOS];
        if (IPOSᐟ === IPOS)
          return IPOS = IPOSₒ, false;
      }
      if (cc === 69 || cc === 101) {
        cc = IN[++IPOS];
        if (cc === 43 || cc === 45)
          cc = IN[++IPOS];
        IPOSᐟ = IPOS;
        while (cc >= 48 && cc <= 57)
          cc = IN[++IPOS];
        if (IPOSᐟ === IPOS)
          return IPOS = IPOSₒ, false;
      }
      if (IPOS > ILEN)
        return IPOS = IPOSₒ, false;
      var num = Number.parseFloat(String.fromCharCode(...IN.slice(IPOSₒ, IPOS)));
      if (!Number.isFinite(num))
        return IPOS = IPOSₒ, false;
      OUT[OPOS++] = num;
      TYPE |= SCALAR;
      return true;
    }
    __name(parseUtf8Float, "parseUtf8Float");
    function printUtf8Float() {
      if (TYPE !== SCALAR)
        return false;
      const num = IN[IPOS];
      if (typeof num !== "number")
        return false;
      IPOS += 1;
      for (var char of String(num))
        OUT[OPOS++] = char.charCodeAt(0);
      return true;
    }
    __name(printUtf8Float, "printUtf8Float");
    function createUtf8IntParser({ base, signed }) {
      $assert(typeof base === "number" && base >= 2 && base <= 36);
      $assert(typeof signed === "boolean");
      return /* @__PURE__ */ __name(function parseUtf8Int() {
        $assert(IN instanceof Uint8Array);
        var IPOSₒ = IPOS;
        var MAX_NUM = signed ? 2147483647 : 4294967295;
        var isNegative = false;
        if (signed && IPOS < ILEN && IN[IPOS] === HYPHEN) {
          isNegative = true;
          MAX_NUM = 2147483648;
          IPOS += 1;
        }
        var num = 0;
        var digits = 0;
        while (IPOS < ILEN) {
          var c2 = IN[IPOS];
          var digitValue = DIGIT_VALUES[c2];
          if (digitValue >= base)
            break;
          num *= base;
          num += digitValue;
          if (num > MAX_NUM)
            return IPOS = IPOSₒ, false;
          IPOS += 1;
          digits += 1;
        }
        if (digits === 0)
          return IPOS = IPOSₒ, false;
        if (isNegative)
          num = -num;
        OUT[OPOS++] = num;
        TYPE |= SCALAR;
        return true;
      }, "parseUtf8Int");
    }
    __name(createUtf8IntParser, "createUtf8IntParser");
    function createUtf8IntPrinter({ base, signed }) {
      $assert(typeof base === "number" && base >= 2 && base <= 36);
      $assert(typeof signed === "boolean");
      return /* @__PURE__ */ __name(function printUtf8Int() {
        if (TYPE !== SCALAR)
          return false;
        let num = IN[IPOS];
        if (typeof num !== "number")
          return false;
        let isNegative = false;
        let MAX_NUM = 2147483647;
        if (num < 0) {
          if (!signed)
            return false;
          isNegative = true;
          num = -num;
          MAX_NUM = 2147483648;
        }
        if (num > MAX_NUM)
          return false;
        const digits = [];
        while (true) {
          const d2 = num % base;
          num = num / base | 0;
          digits.push(CHAR_CODES[d2]);
          if (num === 0)
            break;
        }
        IPOS += 1;
        if (isNegative)
          OUT[OPOS++] = HYPHEN;
        for (let i = digits.length; i > 0; ) {
          OUT[OPOS++] = digits[--i];
        }
        return true;
      }, "printUtf8Int");
    }
    __name(createUtf8IntPrinter, "createUtf8IntPrinter");
    var DIGIT_VALUES = [
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // 00-0f
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // 10-1f
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // 20-2f
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      80,
      80,
      80,
      80,
      80,
      80,
      // 30-3f
      80,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      // 40-4f
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      80,
      80,
      80,
      80,
      80,
      // 50-5f
      80,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      // 60-6f
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      80,
      80,
      80,
      80,
      80,
      // 70-7f
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // 80-8f
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // 90-9f
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // a0-af
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // b0-bf
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // c0-cf
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // d0-df
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      // e0-ef
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80,
      80
      // f0-ff
    ];
    var CHAR_CODES = [
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      // 0-7      01234567
      56,
      57,
      65,
      66,
      67,
      68,
      69,
      70,
      // 8-15     89ABCDEF
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      // 16-23    GHIJKLMN
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      // 24-31    OPQRSTUV
      87,
      88,
      89,
      90
      // 32-35    WXYZ
    ];
    var HYPHEN = "-".charCodeAt(0);
    function createUtf8UecharParser({ base, minlen, maxlen }) {
      $assert(typeof base === "number" && base >= 2 && base <= 36);
      $assert(typeof minlen === "number" && minlen >= 1 && minlen <= 8);
      $assert(typeof maxlen === "number" && maxlen >= minlen && maxlen <= 8);
      return /* @__PURE__ */ __name(function parseUtf8Codepoint() {
        $assert(IN instanceof Uint8Array);
        var IPOSₒ = IPOS;
        var cp = 0;
        var digitCount = 0;
        while (IPOS < ILEN) {
          var c2 = IN[IPOS];
          var digitValue = DIGIT_VALUES[c2];
          if (digitValue >= base)
            break;
          cp = cp * base + digitValue;
          IPOS += 1;
          digitCount += 1;
          if (digitCount === maxlen)
            break;
        }
        if (digitCount < minlen)
          return IPOS = IPOSₒ, false;
        OUT[OPOS++] = cp;
        TYPE |= cp < 55296 ? STRING_FAST : STRING;
        return true;
      }, "parseUtf8Codepoint");
    }
    __name(createUtf8UecharParser, "createUtf8UecharParser");
    function createUtf8UecharPrinter({ base, minlen, maxlen }) {
      $assert(typeof base === "number" && base >= 2 && base <= 36);
      $assert(typeof minlen === "number" && minlen >= 1 && minlen <= 8);
      $assert(typeof maxlen === "number" && maxlen >= minlen && maxlen <= 8);
      return /* @__PURE__ */ __name(function printUtf8Codepoint() {
        if (TYPE !== STRING || IPOS >= ILEN)
          return false;
        var cp = IN[IPOS];
        const s = cp.toString(base).padStart(minlen, "0");
        if (s.length > maxlen)
          return false;
        for (var char of s)
          OUT[OPOS++] = char.charCodeAt(0);
        return true;
      }, "printUtf8Codepoint");
    }
    __name(createUtf8UecharPrinter, "createUtf8UecharPrinter");
    "$END$";
    function sourceCodeBetweenStartAndEndDelimiters() {
      const funcBody = emitRuntimeLibrary.toString();
      const matches = /([ ]*)['"][$]START[$]['"]([^]*)['"][$]END[$]['"]/.exec(funcBody);
      if (!matches)
        throw new Error("Internal error finding text between $START$ and $END$");
      let [, indent, source] = matches;
      const [_, id] = /(__name\w*)/.exec(source) ?? [];
      if (id)
        source = `${indent}var ${id} = x => x;
  ` + source;
      source = source.split(/\r\n?|\n/).map((line) => line.slice(indent.length)).join("\n");
      return source;
    }
    __name(sourceCodeBetweenStartAndEndDelimiters, "sourceCodeBetweenStartAndEndDelimiters");
    const {} = () => [
      $parse,
      $print,
      createLeftrec,
      parseUtf8Float,
      printUtf8Float,
      createUtf8IntParser,
      createUtf8IntPrinter,
      createUtf8UecharParser,
      createUtf8UecharPrinter
    ];
    return "";
  }
  __name(emitRuntimeLibrary, "emitRuntimeLibrary");

  // src/backends/js/emit-scalar.ts
  var emitScalar = /* @__PURE__ */ __name((name, rule, mode) => {
    const val = rule.args[0].value;
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      OUT[OPOS++] = ${val};
                      TYPE |= SCALAR;
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== SCALAR || IPOS >= ILEN) return false;
                      if (IN[IPOS] !== ${val}) return false;
                      IPOS += 1;
                      return true;
                  }
              `;
    }
  }, "emitScalar");

  // src/backends/js/emit-selection.ts
  var emitSelection = /* @__PURE__ */ __name((name, rule, mode, lookup) => {
    const items = rule.args.map((ref) => lookup(ref.name).rule);
    if (items.length === 0)
      return emitNeverMatch(name);
    if (isEveryRuleOfKind(items, "char"))
      return emitCharSelection(name, items, mode);
    if (isEveryRuleOfKind(items, "utf8.char"))
      return emitCharSelection(name, items, mode);
    if (isEveryRuleOfKind(items, "byte"))
      return emitByteSelection(name, items, mode);
    const targets = rule.args;
    return `
          function ${name}() {
              return ${targets.map((target) => `${target.name}()`).join(" || ")};
          }
      `;
  }, "emitSelection");
  function emitNeverMatch(name) {
    return `
          function ${name}() {
              return false;
          }
      `;
  }
  __name(emitNeverMatch, "emitNeverMatch");
  function emitCharSelection(name, items, mode) {
    const kind = items[0].kind;
    const args = items.map((item) => item.args);
    const defaultCp = args[0][0].kind === "Range" ? args[0][0].min ?? 0 : args[0][0].value;
    const hasOutput = kind === "utf8.char" || kind === "char" && mode === "parse";
    const cond = args.map(([arg]) => {
      const min = arg.kind === "Range" ? arg.min : arg.value;
      const max = arg.kind === "Range" ? arg.max : arg.value;
      if (min === null)
        return max === null ? "" : `cp > ${hexLit(max)}`;
      if (max === null)
        return `cp < ${hexLit(min)}`;
      if (min === max)
        return `cp !== ${hexLit(min)}`;
      return `(cp < ${hexLit(min)} || cp > ${hexLit(max)})`;
    }).filter((cond2) => !!cond2).join(" && ");
    const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n") || "?").join(" | ").trim();
    const isAscii = args.every(([arg]) => arg.kind === "Range" ? arg.max !== null && arg.max < 128 : arg.value < 128);
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      ${kind === "utf8.char" ? `
                          ${cond ? "var IPOSₒ = IPOS;" : ""}
                          var cp = readUtf8Codepoint();
                          if (cp === -1) return false;
                      ` : ""}
                      ${comment ? ` // ${comment}` : ""}
                      ${kind === "utf8.char" && cond ? `if (${cond}) return IPOS = IPOSₒ, false;` : ""}
                      OUT[OPOS++] = ${kind === "char" ? hexLit(defaultCp) : "cp"};
                      TYPE |= ${isAscii || kind === "char" ? defaultCp < 55296 ? "STRING_FAST" : "STRING" : "(cp < 0xd800 ? STRING_FAST : STRING)"};
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== STRING || IPOS >= ILEN) return false;
                      var cp = IN[IPOS];
                      ${comment ? ` // ${comment}` : ""}
                      ${cond ? `if (${cond}) return false;` : ""}
                      ${hasOutput ? isAscii ? `OUT[OPOS++] = cp;` : `writeUtf8Codepoint(cp);` : ""}
                      IPOS += 1;
                      return true;
                  }
              `;
    }
  }
  __name(emitCharSelection, "emitCharSelection");
  function emitByteSelection(name, items, mode) {
    switch (mode) {
      case "parse": {
        const cond = items.map(({ args: [arg] }) => {
          const min = arg.kind === "Range" ? arg.min : arg.value;
          const max = arg.kind === "Range" ? arg.max : arg.value;
          if (min === null)
            return max === null ? "" : `b > ${hexLit(max)}`;
          if (max === null)
            return `b < ${hexLit(min)}`;
          if (min === max)
            return `b !== ${hexLit(min)}`;
          return `(b < ${hexLit(min)} || b > ${hexLit(max)})`;
        }).filter((cond2) => !!cond2).join(" && ");
        const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n") || "?").join(" | ").trim();
        return `
                  function ${name}() {
                      if (IPOS >= ILEN) return false;
                      var b = IN[IPOS];
                      ${comment ? ` // ${comment}` : ""}
                      ${cond ? `if (${cond}) return false;` : ""}
                      IPOS += 1;
                      return true;
                  }
              `;
      }
      case "print": {
        const args = items[0].args;
        const b = args[0].kind === "Range" ? args[0].min ?? 0 : args[0].value;
        const comment = items[0].meta.note.replace(/[\r\n]/g, "\\n");
        return `
                  function ${name}() {
                      OUT[OPOS++] = ${hexLit(b)};${comment ? ` // ${comment}` : ""}
                      return true;
                  }
              `;
      }
    }
  }
  __name(emitByteSelection, "emitByteSelection");

  // src/backends/js/emit-sequence.ts
  var emitSequence = /* @__PURE__ */ __name((name, rule, mode, lookup) => {
    const items = rule.args.map((ref) => lookup(ref.name).rule);
    if (items.length === 0)
      return emitAlwaysMatch(name);
    if (isEveryRuleOfKind(items, "byte"))
      return emitByteSequence(name, items, mode);
    const targets = rule.args;
    return `
          function ${name}() {
              var IPOSₒ = IPOS, OPOSₒ = OPOS, TYPEₒ = TYPE;
              if (${targets.map((target) => `${target.name}()`).join(" && ")}) return true;
              IPOS = IPOSₒ, OPOS = OPOSₒ, TYPE = TYPEₒ;
              return false;
          }
      `;
  }, "emitSequence");
  function emitAlwaysMatch(name) {
    return `
          function ${name}() {
              return true;
          }
      `;
  }
  __name(emitAlwaysMatch, "emitAlwaysMatch");
  function emitByteSequence(name, items, mode) {
    switch (mode) {
      case "parse":
        const body = items.map(({ args: [arg], meta: { note } }, i) => {
          const min = arg.kind === "Range" ? arg.min : arg.value;
          const max = arg.kind === "Range" ? arg.max : arg.value;
          const byteRef = `IN[IPOS${i > 0 ? ` + ${i}` : ""}]`;
          const comment2 = note ? ` // ${note.replace(/[\r\n]/g, "\\n")}` : "";
          if (min === null)
            return max === null ? "" : `if (${byteRef} > ${hexLit(max)}) return false;${comment2}`;
          if (max === null)
            return `if (${byteRef} < ${hexLit(min)}) return false;${comment2}`;
          if (min === max)
            return `if (${byteRef} !== ${hexLit(min)}) return false;${comment2}`;
          return `if (${byteRef} < ${hexLit(min)} || ${byteRef} > ${hexLit(max)}) return false;${comment2}`;
        }).filter((cond) => !!cond).join("\n");
        return `
                  function ${name}() {
                      if (IPOS + ${items.length} > ILEN) return false;
                      ${body}
                      IPOS += ${items.length};
                      return true;
                  }
              `;
      case "print":
        const bytes = items.map(({ args: [arg] }) => arg.kind === "Range" ? arg.min ?? 0 : arg.value);
        const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n")).join(" ").trim();
        return `
                  function ${name}() {
                      ${comment ? ` // ${comment}
  ` : ""}
                      ${bytes.map((byte) => `
                          OUT[OPOS++] = ${hexLit(byte)};
                      `).join("")}
                      return true;
                  }
              `;
    }
  }
  __name(emitByteSequence, "emitByteSequence");

  // src/backends/js/emit-string.ts
  var emitString = /* @__PURE__ */ __name((name, rule, mode) => {
    const codepoints = [];
    for (var char of rule.args[0].value)
      codepoints.push(char.codePointAt(0));
    const len = codepoints.length;
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      ${codepoints.map((cp) => `
                          OUT[OPOS++] = ${hexLit(cp)};
                      `).join("")}
                      TYPE |= ${codepoints.every((cp) => cp < 55296) ? "STRING_FAST" : "STRING"};
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== STRING) return false;
                      ${len > 0 ? `
                          if (IPOS${len > 1 ? ` + ${len - 1}` : ""} >= ILEN) return false;
                          ${codepoints.map((cp, i) => `
                              if (IN[IPOS${i > 0 ? ` + ${i}` : ""}] !== ${hexLit(cp)}) return false;
                          `).join("")}
                          IPOS += ${len};
                      ` : ""}
                      return true;
                  }
              `;
    }
  }, "emitString");

  // src/backends/js/emit-utf8-char.ts
  var emitUtf8Char = /* @__PURE__ */ __name((name, rule, mode) => {
    const min = rule.args[0].kind === "Range" ? rule.args[0].min : rule.args[0].value;
    const max = rule.args[0].kind === "Range" ? rule.args[0].max : rule.args[0].value;
    const cond = min === null ? max === null ? "" : `cp > ${hexLit(max)}` : max === null ? `cp < ${hexLit(min)}` : min === max ? `cp !== ${hexLit(min)}` : `cp < ${hexLit(min)} || cp > ${hexLit(max)}`;
    const isAscii = max !== null && max < 128;
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      ${cond ? "var IPOSₒ = IPOS;" : ""}
                      var cp = readUtf8Codepoint();
                      if (cp === -1) return false;
                      ${cond ? `if (${cond}) return IPOS = IPOSₒ, false;` : ""}
                      OUT[OPOS++] = cp;
                      TYPE |= (cp < 0xd800 ? STRING_FAST : STRING);
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== STRING || IPOS >= ILEN) return false;
                      var cp = IN[IPOS];
                      ${cond ? `if (${cond}) return false;` : ""}
                      ${isAscii ? `OUT[OPOS++] = cp;` : `writeUtf8Codepoint(cp);`}
                      IPOS += 1;
                      return true;
                  }
              `;
    }
  }, "emitUtf8Char");

  // src/backends/js/emit-utf8-float.ts
  var emitUtf8Float = /* @__PURE__ */ __name((name, _rule, mode) => {
    const helperName = mode === "parse" ? "parseUtf8Float" : "printUtf8Float";
    return `
          var ${name} = ${helperName};
      `;
  }, "emitUtf8Float");

  // src/backends/js/emit-utf8-int.ts
  var emitUtf8Int = /* @__PURE__ */ __name((name, rule, mode) => {
    const [{ base, signed }] = rule.args;
    const helperName = mode === "parse" ? "createUtf8IntParser" : "createUtf8IntPrinter";
    return `
          var ${name} = ${helperName}({base: ${base}, signed: ${signed}});
      `;
  }, "emitUtf8Int");

  // src/backends/js/emit-utf8-string.ts
  var emitUtf8String = /* @__PURE__ */ __name((name, rule, mode) => {
    const codepoints = [];
    for (var char of rule.args[0].value)
      codepoints.push(char.codePointAt(0));
    const len = codepoints.length;
    const isAscii = codepoints.map((cp) => cp < 128);
    switch (mode) {
      case "parse":
        return `
                  function ${name}() {
                      ${len > 0 ? `
                          var IPOSₒ = IPOS;
                          ${codepoints.map((cp) => `
                              if (readUtf8Codepoint() !== ${hexLit(cp)}) return IPOS = IPOSₒ, false;
                          `).join("")}
                          ${codepoints.map((cp) => `
                              OUT[OPOS++] = ${hexLit(cp)};
                          `).join("")}
                      ` : ""}
                      TYPE |= ${codepoints.every((cp) => cp < 55296) ? "STRING_FAST" : "STRING"};
                      return true;
                  }
              `;
      case "print":
        return `
                  function ${name}() {
                      if (TYPE !== STRING) return false;
                      ${len > 0 ? `
                          if (IPOS${len > 1 ? ` + ${len - 1}` : ""} >= ILEN) return false;
                          ${codepoints.map((cp, i) => `
                              if (IN[IPOS${i > 0 ? ` + ${i}` : ""}] !== ${hexLit(cp)}) return false;
                          `).join("")}
                          IPOS += ${len};
                          ${codepoints.map((cp, i) => `
                              ${isAscii[i] ? `OUT[OPOS++] = ${hexLit(cp)};` : `writeUtf8Codepoint(${hexLit(cp)});`}
                          `).join("")}
                      ` : ""}
                      return true;
                  }
              `;
    }
  }, "emitUtf8String");

  // src/backends/js/emit-utf8-uechar.ts
  var emitUtf8UnicodeEscapedChar = /* @__PURE__ */ __name((name, rule, mode) => {
    const [{ base, minlen, maxlen }] = rule.args;
    const helperName = mode === "parse" ? "createUtf8UecharParser" : "createUtf8UecharPrinter";
    return `
          var ${name} = ${helperName}({base: ${base}, minlen: ${minlen}, maxlen: ${maxlen}});
      `;
  }, "emitUtf8UnicodeEscapedChar");

  // src/backends/js/pil-to-js.ts
  function pilToJs(pil, options2) {
    const out = {
      parts: [],
      write(...strs) {
        out.parts.push(...strs);
      },
      build() {
        return out.parts.join("");
      }
    };
    function isElidable(line) {
      const trimmed = line.trim();
      if (trimmed.length === 0)
        return true;
      return !options2?.emitDebugAssertions && trimmed.startsWith("$assert(");
    }
    __name(isElidable, "isElidable");
    const { prolog, epilog } = emitWrapper(options2?.format ?? "cjs");
    out.write(prolog);
    out.write("\n\n\n\n\n", `// ------------------------------ Runtime ------------------------------`);
    const runtimeLibrarySource = emitRuntimeLibrary();
    runtimeLibrarySource.split(/[\r\n]+/).filter((line) => !isElidable(line)).forEach((line) => out.write("\n", line));
    out.write("\n\n\n\n\n", `// ------------------------------ Parse Rules ------------------------------`);
    emitRules({ pil, mode: "parse", isElidable, write: out.write });
    out.write("\n\n\n\n\n", `// ------------------------------ Print Rules ------------------------------`);
    emitRules({ pil, mode: "print", isElidable, write: out.write });
    out.write("\n\n\n\n\n", epilog, "\n");
    return out.build();
  }
  __name(pilToJs, "pilToJs");
  function emitWrapper(format) {
    switch (format) {
      case "cjs":
        return {
          prolog: `(function(m) {`,
          epilog: `m.exports = {parse: $parse, print: $print}; })(module);`
        };
      case "iife":
        return {
          // TODO: ...
          prolog: "(function () {",
          epilog: "return {parse: $parse, print: $print}; })();"
        };
    }
  }
  __name(emitWrapper, "emitWrapper");
  function emitRules({ pil, mode, isElidable, write }) {
    const epsilonDerivingRules = findEpsilonDerivingRules({ pil, mode });
    const leftRecursiveHeadRules = findLeftRecursiveHeadRules({ pil, mode, epsilonDerivingRules });
    const rename = /* @__PURE__ */ __name((ruleName) => mode === "parse" ? `ᝍ${ruleName}ᐅ` : `ᐊ${ruleName}ᝍ`, "rename");
    [...epsilonDerivingRules.keys()].forEach((name) => epsilonDerivingRules.add(rename(name)).delete(name));
    [...leftRecursiveHeadRules.keys()].forEach((name) => leftRecursiveHeadRules.add(rename(name)).delete(name));
    const startRuleName = rename("start");
    let rules = bulkRename(pil, rename).rules;
    if (leftRecursiveHeadRules.size > 0) {
      const entries = Object.entries(rules);
      rules = {};
      for (let [name, rule] of entries) {
        if (leftRecursiveHeadRules.has(name)) {
          const origName = name;
          for (let i = 1; rules.hasOwnProperty(name = rename(origName.slice(1, -1) + "ᐟ".repeat(i))); ++i)
            ;
          rules[origName] = { kind: "leftrec", args: [{ kind: "Ref", name }], meta: { note: "" } };
        }
        rules[name] = rule;
      }
    }
    const lookup = /* @__PURE__ */ __name((ruleName) => {
      const rule = rules[ruleName];
      if (!rule)
        throw new Error(`Rule ${JSON.stringify(ruleName)} not found`);
      const alwaysConsumes = !epsilonDerivingRules.has(ruleName);
      return { rule, alwaysConsumes };
    }, "lookup");
    const getJsCodeForRule = memoise({
      calculate(name) {
        const rule = rules[name];
        switch (rule.kind) {
          case "assertion":
            return emitAssertion(name, rule, mode, lookup);
          case "byte":
            return emitByte(name, rule, mode, lookup);
          case "char":
            return emitChar(name, rule, mode, lookup);
          case "is.parse":
            return emitIsX(name, rule, mode, lookup);
          case "is.print":
            return emitIsX(name, rule, mode, lookup);
          case "iteration":
            return emitIteration(name, rule, mode, lookup);
          case "leftrec":
            return emitLeftrec(name, rule, mode, lookup);
          case "list":
            return emitList(name, rule, mode, lookup);
          case "negation":
            return emitNegation(name, rule, mode, lookup);
          case "record":
            return emitRecord(name, rule, mode, lookup);
          case "scalar":
            return emitScalar(name, rule, mode, lookup);
          case "selection":
            return emitSelection(name, rule, mode, lookup);
          case "sequence":
            return emitSequence(name, rule, mode, lookup);
          case "string":
            return emitString(name, rule, mode, lookup);
          case "utf8.char":
            return emitUtf8Char(name, rule, mode, lookup);
          case "utf8.float":
            return emitUtf8Float(name, rule, mode, lookup);
          case "utf8.int":
            return emitUtf8Int(name, rule, mode, lookup);
          case "utf8.string":
            return emitUtf8String(name, rule, mode, lookup);
          case "utf8.uechar":
            return emitUtf8UnicodeEscapedChar(name, rule, mode, lookup);
          default:
            ((rule2) => {
              throw new Error(`unrecognised kind '${rule2.kind}'`);
            })(rule);
        }
      }
    });
    const reachableRuleNames = (/* @__PURE__ */ new Set()).add(startRuleName);
    for (const ruleName of reachableRuleNames) {
      const jsCode = getJsCodeForRule(ruleName);
      for (const arg of rules[ruleName].args) {
        if (!arg || typeof arg !== "object" || arg.kind !== "Ref")
          continue;
        const referencedRuleName = arg.name;
        if (reachableRuleNames.has(referencedRuleName))
          continue;
        const regex = RegExp(`[^wᝍᐅᐊ]${referencedRuleName.replace("$", "\\$")}[^wᝍᐅᐊ]`);
        if (!regex.test(jsCode))
          continue;
        reachableRuleNames.add(referencedRuleName);
      }
    }
    for (const ruleName in rules) {
      if (!reachableRuleNames.has(ruleName))
        continue;
      const note = rules[ruleName]?.meta?.note;
      if (note) {
        write("\n");
        note.split(/[\r\n]+/).forEach((line) => {
          if (!line.trim())
            return;
          write("\n// ", line);
        });
      }
      const lines = getJsCodeForRule(ruleName).split(/\r\n|\r|\n/).map((line) => line.trim()).filter((line) => line.length);
      let indent = "";
      for (const line of lines) {
        if (isElidable(line))
          continue;
        if ("}])".includes(line[0]))
          indent = indent.slice(0, -4);
        write("\n", indent, line);
        if ("{[(".includes(line[line.length - 1]))
          indent += "    ";
      }
    }
  }
  __name(emitRules, "emitRules");

  // src/pil/index.ts
  var import_pil = __toESM(require_pil());

  // src/backends/text.ts
  function pilToText(pil) {
    return (0, import_pil.print)(pil.rules);
  }
  __name(pilToText, "pilToText");

  // src/frontends/peg/ast-to-pil.ts
  function astToPil(ast) {
    const pil = { rules: {} };
    let counter = 0;
    const nextName = /* @__PURE__ */ __name(() => `$${++counter}`, "nextName");
    ast.definitions.forEach(({ lhs: name, rhs: expr }) => {
      if (pil.rules[name])
        throw new Error(`'${name}' rule has multiple definitions`);
      pil.rules[name] = exprToRule(expr, `${name} <- ${expr.text}`);
    });
    checkNames(pil);
    return reorderRules(pil, ast.definitions.map((defn) => defn.lhs));
    function emitExpr(expr) {
      if (expr.kind === "Reference")
        return { kind: "Ref", name: expr.identifier };
      const name = nextName();
      pil.rules[name] = exprToRule(expr, expr.text);
      return { kind: "Ref", name };
    }
    __name(emitExpr, "emitExpr");
    function exprToRule(e, note) {
      const meta = { note: note ?? "" };
      switch (e.kind) {
        case "AnyChar":
          return { kind: "utf8.char", args: [{ kind: "Range", min: null, max: null }], meta };
        case "Choice":
          return { kind: "selection", args: e.items.map(emitExpr), meta };
        case "Class":
          return { kind: "selection", meta, args: e.ranges.map(([min, max]) => {
            const name = nextName();
            const range2 = { kind: "Range", min: charToCodepoint(min), max: charToCodepoint(max) };
            pil.rules[name] = { kind: "utf8.char", args: [range2], meta: { note: `[${min}-${max}]` } };
            return { kind: "Ref", name };
          }) };
        case "Literal":
          return { kind: "utf8.string", args: [{ kind: "Const", value: e.value }], meta };
        case "Lookahead":
          return { kind: e.positive ? "assertion" : "negation", args: [emitExpr(e.expression)], meta };
        case "OneOrMore":
          return { kind: "iteration", args: [{ kind: "Range", min: 1, max: null }, emitExpr(e.expression)], meta };
        case "Optional":
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: 1 }, emitExpr(e.expression)], meta };
        case "Reference":
          return { kind: "selection", args: [{ kind: "Ref", name: e.identifier }], meta };
        case "Sequence":
          return { kind: "sequence", args: e.items.map(emitExpr), meta };
        case "ZeroOrMore":
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: null }, emitExpr(e.expression)], meta };
        default:
          ((expr) => {
            throw new Error(`unrecognised node kind '${expr.kind}'`);
          })(e);
      }
    }
    __name(exprToRule, "exprToRule");
  }
  __name(astToPil, "astToPil");
  function charToCodepoint(c2) {
    const chars = [...c2];
    if (chars.length !== 1)
      throw new Error(`Expected a single character but found '${JSON.stringify(c2)}'`);
    return chars[0].codePointAt(0);
  }
  __name(charToCodepoint, "charToCodepoint");

  // src/frontends/peg/peg-to-pil.ts
  var import_peg = __toESM(require_peg());
  function pegToPil(pegSource) {
    const ast = (0, import_peg.parse)(pegSource);
    return astToPil(ast);
  }
  __name(pegToPil, "pegToPil");

  // src/frontends/pen/ast-to-pil.ts
  function astToPil2(ast) {
    const pil = { rules: {} };
    let counter = 0;
    const nextName = /* @__PURE__ */ __name(() => `$${++counter}`, "nextName");
    ast.definitions.forEach(({ lhs: name, rhs: expr }) => {
      if (pil.rules[name])
        throw new Error(`'${name}' rule has multiple definitions`);
      pil.rules[name] = exprToRule(expr, `${name} = ${expr.text}`);
    });
    checkNames(pil);
    return reorderRules(pil, ast.definitions.map((defn) => defn.lhs));
    function emitExpr(expr) {
      if (expr.kind === "Reference")
        return { kind: "Ref", name: expr.identifier };
      const name = nextName();
      pil.rules[name] = exprToRule(expr, expr.text);
      return { kind: "Ref", name };
    }
    __name(emitExpr, "emitExpr");
    function sequenceOfRules(meta, rules) {
      if (rules.length === 1)
        return { ...rules[0], meta };
      return { kind: "sequence", meta, args: rules.map((rule) => {
        const name = nextName();
        pil.rules[name] = rule;
        return { kind: "Ref", name };
      }) };
    }
    __name(sequenceOfRules, "sequenceOfRules");
    function selectionOfRules(meta, rules) {
      if (rules.length === 1)
        return { ...rules[0], meta };
      return { kind: "selection", meta, args: rules.map((rule) => {
        const name = nextName();
        pil.rules[name] = rule;
        return { kind: "Ref", name };
      }) };
    }
    __name(selectionOfRules, "selectionOfRules");
    function exprToRule(e, note) {
      const meta = { note: note ?? "" };
      switch (e.kind) {
        case "AnyChar": {
          return { kind: "utf8.char", args: [{ kind: "Range", min: null, max: null }], meta };
        }
        case "ByteList": {
          return sequenceOfRules(meta, e.items.map((item) => {
            const [min, max] = typeof item === "number" ? [item, item] : item;
            return { kind: "byte", args: [{ kind: "Range", min, max }], meta: { note: `#${min}-${max}` } };
          }));
        }
        case "Choice": {
          return { kind: "selection", args: e.items.map(emitExpr), meta };
        }
        case "IntrinsicFloat":
          return { kind: "utf8.float", args: [], meta };
        case "IntrinsicInt":
          return { kind: "utf8.int", args: [{ kind: "Utf8IntArgs", base: 10, signed: true }], meta };
        case "IntrinsicHex":
          return { kind: "utf8.int", args: [{ kind: "Utf8IntArgs", base: 16, signed: false }], meta };
        case "IntrinsicParse":
          return { kind: "is.parse", args: [], meta };
        case "IntrinsicPrint":
          return { kind: "is.print", args: [], meta };
        case "List": {
          if (e.items.length === 0)
            return { kind: "list", args: [], meta };
          const seqParts = split(e.items, (a, b) => a.kind === "Splice" || b.kind === "Splice");
          return sequenceOfRules(meta, seqParts.map((items) => {
            if (items[0].kind === "Splice")
              return exprToRule(items[0].expression);
            return { kind: "list", meta: { note: "" }, args: items.map((item) => {
              if (item.kind === "Splice")
                throw new Error(`assertion failed: item.kind !== 'Splice'`);
              return emitExpr(item);
            }) };
          }));
        }
        case "Lookahead": {
          return { kind: e.positive ? "assertion" : "negation", args: [emitExpr(e.expression)], meta };
        }
        case "OneOrMore": {
          return { kind: "iteration", args: [{ kind: "Range", min: 1, max: null }, emitExpr(e.expression)], meta };
        }
        case "Optional": {
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: 1 }, emitExpr(e.expression)], meta };
        }
        case "Record": {
          if (e.items.length === 0)
            return { kind: "record", args: [], meta };
          const seqParts = split(e.items, (a, b) => a.kind === "Splice" || b.kind === "Splice");
          return sequenceOfRules(meta, seqParts.map((items) => {
            if (items[0].kind === "Splice")
              return exprToRule(items[0].expression);
            return { kind: "record", meta: { note: "" }, args: [].concat(...items.map((item) => {
              if (item.kind !== "Field")
                throw new Error(`assertion failed: item.kind === 'Field'`);
              let label2 = item.label;
              if (typeof label2 === "string")
                label2 = { kind: "StringA", items: [label2], text: "" };
              return [emitExpr(label2), emitExpr(item.expression)];
            })) };
          }));
        }
        case "Reference": {
          return { kind: "selection", args: [{ kind: "Ref", name: e.identifier }], meta };
        }
        case "Scalar": {
          return { kind: "scalar", args: [{ kind: "Const", value: e.value }], meta };
        }
        case "Sequence": {
          return { kind: "sequence", args: e.items.map(emitExpr), meta };
        }
        case "StringA": {
          if (e.items.length === 0)
            return { kind: "string", args: [{ kind: "Const", value: "" }], meta };
          return sequenceOfRules(meta, e.items.map((item) => {
            if (typeof item === "string") {
              return { kind: "string", args: [{ kind: "Const", value: item }], meta: { note: JSON.stringify(item) } };
            } else {
              const note2 = `[${item.map(([min, max]) => `${min}-${max}`).join("")}]`;
              return selectionOfRules({ note: note2 }, item.map(([min, max]) => ({
                kind: "char",
                args: [{ kind: "Range", min: charToCodepoint2(min), max: charToCodepoint2(max) }],
                meta: { note: `[${printableChar(min)}-${printableChar(max)}]` }
              })));
            }
          }));
        }
        case "StringC": {
          return sequenceOfRules(meta, e.items.map((item) => {
            if (typeof item === "string") {
              const bytes = stringToUtf8Bytes(item);
              return sequenceOfRules({ note: "" }, bytes.map((byte) => ({
                // TODO: fix meta
                kind: "byte",
                args: [{ kind: "Const", value: byte }],
                meta: { note: `#${byte}` }
              })));
            } else {
              const ranges = item.map(([min, max]) => {
                let minCp = charToCodepoint2(min);
                let maxCp = charToCodepoint2(max);
                if (min.length > 1 || minCp > 127 || max.length > 1 || maxCp > 127) {
                  throw new Error("Byte range outside 0..0xFF not currently supported");
                }
                return [minCp, maxCp];
              });
              const note2 = `[${item.map(([min, max]) => `${min}-${max}`).join("")}]`;
              return selectionOfRules({ note: note2 }, ranges.map(([min, max]) => ({
                // TODO: fix meta
                kind: "byte",
                args: [{ kind: "Range", min, max }],
                meta: { note: `[${min}-${max}]` }
              })));
            }
          }));
        }
        case "StringX": {
          if (e.items.length === 0)
            return { kind: "utf8.string", args: [{ kind: "Const", value: "" }], meta };
          return sequenceOfRules(meta, e.items.map((item) => {
            if (typeof item === "string") {
              return { kind: "utf8.string", args: [{ kind: "Const", value: item }], meta: { note: JSON.stringify(item) } };
            } else {
              const note2 = `[${item.map(([min, max]) => `${min}-${max}`).join("")}]`;
              return selectionOfRules({ note: note2 }, item.map(([min, max]) => ({
                kind: "utf8.char",
                args: [{ kind: "Range", min: charToCodepoint2(min), max: charToCodepoint2(max) }],
                meta: { note: `[${printableChar(min)}-${printableChar(max)}]` }
              })));
            }
          }));
        }
        case "ZeroOrMore": {
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: null }, emitExpr(e.expression)], meta };
        }
        default: {
          ((expr) => {
            throw new Error(`unrecognised node kind '${expr.kind}'`);
          })(e);
        }
      }
    }
    __name(exprToRule, "exprToRule");
  }
  __name(astToPil2, "astToPil");
  function charToCodepoint2(c2) {
    const chars = [...c2];
    if (chars.length !== 1)
      throw new Error(`Expected a single character but found '${JSON.stringify(c2)}'`);
    return chars[0].codePointAt(0);
  }
  __name(charToCodepoint2, "charToCodepoint");
  function stringToUtf8Bytes(s) {
    return [...s].map((c2) => c2.codePointAt(0)).flatMap((cp) => {
      if (cp < 128)
        return cp;
      if (cp < 2048)
        return [
          192 | cp >> 6,
          128 | cp & 63
        ];
      if (cp < 65536)
        return [
          224 | cp >> 12,
          128 | cp >> 6 & 63,
          128 | cp & 63
        ];
      return [
        240 | cp >> 18,
        128 | cp >> 12 & 63,
        128 | cp >> 6 & 63,
        128 | cp & 63
      ];
    });
  }
  __name(stringToUtf8Bytes, "stringToUtf8Bytes");
  function printableChar(c2) {
    const cp = charToCodepoint2(c2);
    return cp >= 32 ? c2 : `\\x${cp.toString(16).padStart(2, "0")}`;
  }
  __name(printableChar, "printableChar");
  function split(arr, cb) {
    if (arr.length <= 1)
      return [arr];
    const result = [];
    let currentGroup = [arr[0]];
    let prev = arr[0];
    for (let i = 1; i < arr.length; ++i) {
      const next = arr[i];
      if (cb(prev, next)) {
        result.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(next);
      prev = next;
    }
    if (currentGroup.length > 0)
      result.push(currentGroup);
    return result;
  }
  __name(split, "split");

  // src/frontends/pen/pen-to-pil.ts
  var import_pen = __toESM(require_pen());
  function penToPil(penSource) {
    const ast = (0, import_pen.parse)(penSource);
    return astToPil2(ast);
  }
  __name(penToPil, "penToPil");

  // src/frontends/text.ts
  function textToPil(pilSource) {
    const rules = (0, import_pil.parse)(pilSource);
    const pil = { rules };
    checkNames(pil);
    return pil;
  }
  __name(textToPil, "textToPil");

  // src/api.ts
  function penc(source, options2) {
    const opts = { ...defaultOptions, ...options2 };
    const frontend = chooseFrontend(opts);
    const backend = chooseBackend(opts);
    const pil = frontend(source);
    const result = backend(pil);
    return result;
  }
  __name(penc, "penc");
  var defaultOptions = {
    loader: "data:pen",
    target: "js/cjs",
    debug: false
  };
  function chooseFrontend({ loader }) {
    switch (loader) {
      case "data:pen":
        return penToPil;
      case "data:peg":
        return pegToPil;
      case "data:pil":
        return textToPil;
    }
  }
  __name(chooseFrontend, "chooseFrontend");
  function chooseBackend({ target, debug }) {
    const emitDebugAssertions = debug;
    switch (target) {
      case "js/cjs":
        return (pil) => pilToJs(pil, { format: "cjs", emitDebugAssertions });
      case "js/iife":
        return (pil) => pilToJs(pil, { format: "iife", emitDebugAssertions });
      case "pil":
        return (pil) => pilToText(pil);
    }
  }
  __name(chooseBackend, "chooseBackend");
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=penc.js.map
