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

  // src/midend/pil/pil.pen
  var require_pil = __commonJS({
    "src/midend/pil/pil.pen"(exports2, module2) {
      "use strict";
      ((m) => m.exports = {
        parse: function() {
          var __name2 = /* @__PURE__ */ __name((x) => x, "__name");
          var IN;
          var IPOS;
          var ILEN;
          var OUT;
          var OPOS;
          var isFastString = true;
          var stringCodepoints = new Uint32Array(1);
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
            IN = typeof stringOrBytes === "string" ? stringToUtf8Bytes2(stringOrBytes) : stringOrBytes;
            IPOS = 0, ILEN = IN.length, OUT = [], OPOS = 0;
            onReset.forEach((cb) => cb());
            if (!ᝍstartᐅ2())
              throw new Error("parse failed");
            if (IPOS !== ILEN)
              throw new Error("parse did not consume entire input");
            if (OPOS !== 1)
              throw new Error("parse did not produce a singular value");
            return OUT[0];
          }
          __name($parse, "$parse");
          __name2($parse, "$parse");
          function $print(value, outputBytes) {
            IN = [value], IPOS = 0, ILEN = 1;
            OUT = outputBytes ?? new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
            onReset.forEach((cb) => cb());
            if (!ᐊstartᝍ())
              throw new Error("print failed");
            if (OPOS > OUT.length)
              throw new Error("output buffer too small");
            return outputBytes ? OPOS : utf8BytesToString(OUT.subarray(0, OPOS));
          }
          __name($print, "$print");
          __name2($print, "$print");
          function parseString(rule) {
            var OPOSₒ = OPOS;
            isFastString = true;
            if (!rule())
              return false;
            if (isFastString && OPOS - OPOSₒ < 65536) {
              OUT[OPOSₒ] = String.fromCharCode.apply(String, OUT.slice(OPOSₒ, OPOS));
            } else {
              for (var str = "", i = OPOSₒ; i < OPOS; i += 65536) {
                str += String.fromCodePoint.apply(String, OUT.slice(i, Math.min(i + 65536, OPOS)));
              }
              OUT[OPOSₒ] = str;
            }
            OPOS = OPOSₒ + 1;
            return true;
          }
          __name(parseString, "parseString");
          __name2(parseString, "parseString");
          function printString(rule) {
            var value = IN[IPOS];
            if (IPOS >= ILEN || typeof value !== "string")
              return false;
            var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
            var vl = value.length;
            if (stringCodepoints.length < vl)
              stringCodepoints = new Uint32Array(vl);
            IN = stringCodepoints, ILEN = 0, IPOS = 0;
            for (var i = 0; i < vl; ++i) {
              var cp = value.charCodeAt(i);
              if ((cp & 64512) === 55296)
                cp = value.codePointAt(i++);
              IN[ILEN++] = cp;
            }
            var result = rule() && IPOS === ILEN;
            IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
            if (result)
              IPOS += 1;
            return result;
          }
          __name(printString, "printString");
          __name2(printString, "printString");
          function parseList(rule) {
            var OPOSₒ = OPOS;
            if (!rule())
              return false;
            OUT[OPOSₒ] = OUT.slice(OPOSₒ, OPOS);
            OPOS = OPOSₒ + 1;
            return true;
          }
          __name(parseList, "parseList");
          __name2(parseList, "parseList");
          function printList(rule) {
            var value = IN[IPOS];
            if (IPOS >= ILEN || !Array.isArray(value))
              return false;
            var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
            IN = value, IPOS = 0, ILEN = IN.length;
            var result = rule() && IPOS === ILEN;
            IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
            if (result)
              IPOS += 1;
            return result;
          }
          __name(printList, "printList");
          __name2(printList, "printList");
          function parseRecord(rule) {
            var OPOSₒ = OPOS;
            if (!rule())
              return false;
            var obj = {};
            for (var i = OPOSₒ; i < OPOS; i += 2) {
              var label2 = OUT[i];
              $assert(!obj.hasOwnProperty(label2), `Duplicate label '${label2}' in record`);
              obj[label2] = OUT[i + 1];
            }
            OUT[OPOSₒ] = obj;
            OPOS = OPOSₒ + 1;
            return true;
          }
          __name(parseRecord, "parseRecord");
          __name2(parseRecord, "parseRecord");
          function printRecord(rule) {
            var value = IN[IPOS];
            if (IPOS >= ILEN || value === null || typeof value !== "object" || Array.isArray(value))
              return false;
            var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
            IN = [];
            for (var labels = Object.keys(value), i = 0; i < labels.length; ++i) {
              IN.push(labels[i], value[labels[i]]);
            }
            IPOS = 0, ILEN = IN.length;
            var result = rule() && IPOS === ILEN;
            IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
            if (result)
              IPOS += 1;
            return result;
          }
          __name(printRecord, "printRecord");
          __name2(printRecord, "printRecord");
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
            return true;
          }
          __name(parseUtf8Float, "parseUtf8Float");
          __name2(parseUtf8Float, "parseUtf8Float");
          function printUtf8Float() {
            var num = IN[IPOS];
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
              return true;
            }, "parseUtf8Int"), "parseUtf8Int");
          }
          __name(createUtf8IntParser, "createUtf8IntParser");
          __name2(createUtf8IntParser, "createUtf8IntParser");
          function createUtf8IntPrinter({ base, signed }) {
            $assert(typeof base === "number" && base >= 2 && base <= 36);
            $assert(typeof signed === "boolean");
            return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function printUtf8Int() {
              var num = IN[IPOS];
              if (typeof num !== "number")
                return false;
              var isNegative = false;
              var MAX_NUM = 2147483647;
              if (num < 0) {
                if (!signed)
                  return false;
                isNegative = true;
                num = -num;
                MAX_NUM = 2147483648;
              }
              if (num > MAX_NUM)
                return false;
              var digits = [];
              while (true) {
                var d2 = num % base;
                num = num / base | 0;
                digits.push(CHAR_CODES[d2]);
                if (num === 0)
                  break;
              }
              IPOS += 1;
              if (isNegative)
                OUT[OPOS++] = HYPHEN;
              for (var i = digits.length; i > 0; ) {
                OUT[OPOS++] = digits[--i];
              }
              return true;
            }, "printUtf8Int"), "printUtf8Int");
          }
          __name(createUtf8IntPrinter, "createUtf8IntPrinter");
          __name2(createUtf8IntPrinter, "createUtf8IntPrinter");
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
              if (cp >= 55296)
                isFastString = false;
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
              if (IPOS >= ILEN)
                return false;
              var cp = IN[IPOS];
              var s = cp.toString(base).padStart(minlen, "0");
              if (s.length > maxlen)
                return false;
              for (var char of s)
                OUT[OPOS++] = char.charCodeAt(0);
              return true;
            }, "printUtf8Codepoint"), "printUtf8Codepoint");
          }
          __name(createUtf8UecharPrinter, "createUtf8UecharPrinter");
          __name2(createUtf8UecharPrinter, "createUtf8UecharPrinter");
          function createLeftrec(rule) {
            var saved;
            return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function leftrec() {
              if (saved?.IN === IN && saved.IPOS === IPOS) {
                IPOS += saved.ΔIPOS;
                for (var i = 0; i < saved.ΔOUT.length; ++i)
                  OUT[OPOS++] = saved.ΔOUT[i];
                return saved.result;
              }
              var savedₒ = saved, result = false;
              saved = { IN, IPOS, result, ΔIPOS: 0, ΔOUT: [] };
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              while (true) {
                IPOS = IPOSₒ, OPOS = OPOSₒ;
                result = rule();
                var isFirstIteration = !saved.result;
                var isMoreInputConsumedThanPreviousIteration = IPOS - IPOSₒ > saved.ΔIPOS;
                if (result && (isFirstIteration || isMoreInputConsumedThanPreviousIteration)) {
                  saved.result = result;
                  saved.ΔIPOS = IPOS - IPOSₒ;
                  saved.ΔOUT = OUT.slice(OPOSₒ, OPOS);
                  continue;
                }
                IPOS = IPOSₒ, OPOS = OPOSₒ;
                leftrec();
                saved = savedₒ;
                return result;
              }
            }, "leftrec"), "leftrec");
          }
          __name(createLeftrec, "createLeftrec");
          __name2(createLeftrec, "createLeftrec");
          function stringToUtf8Bytes2(s) {
            OUT = new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
            for (var char of s)
              writeUtf8Codepoint(char.codePointAt(0));
            if (OPOS > OUT.length)
              throw new Error("input buffer too small");
            return OUT.subarray(0, OPOS);
          }
          __name(stringToUtf8Bytes2, "stringToUtf8Bytes2");
          __name2(stringToUtf8Bytes2, "stringToUtf8Bytes");
          function utf8BytesToString(b) {
            IN = b, IPOS = 0, ILEN = b.length;
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
          __name(utf8BytesToString, "utf8BytesToString");
          __name2(utf8BytesToString, "utf8BytesToString");
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
          function ᝍstartᐅ2() {
            return parseRecord(ᝍstart1ᐅ);
          }
          __name(ᝍstartᐅ2, "ᝍstartᐅ");
          function ᝍstart1ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$1ᐅ() && ᝍ$2ᐅ() && ᝍ$6ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍstart1ᐅ, "ᝍstart1ᐅ");
          function ᝍ$1ᐅ() {
            return ᝍWSᐅ() || true;
          }
          __name(ᝍ$1ᐅ, "ᝍ$1ᐅ");
          function ᝍ$2ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$3ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$2ᐅ, "ᝍ$2ᐅ");
          function ᝍ$3ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "rules";
            if (!ᝍ$5ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$3ᐅ, "ᝍ$3ᐅ");
          function ᝍ$5ᐅ() {
            return parseRecord(ᝍlinesᐅ);
          }
          __name(ᝍ$5ᐅ, "ᝍ$5ᐅ");
          function ᝍ$6ᐅ() {
            return ᝍWSᐅ() || true;
          }
          __name(ᝍ$6ᐅ, "ᝍ$6ᐅ");
          function ᝍlinesᐅ() {
            return ᝍ$7ᐅ() || ᝍ$11ᐅ();
          }
          __name(ᝍlinesᐅ, "ᝍlinesᐅ");
          function ᝍ$7ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍlineᐅ() && ᝍ$8ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$7ᐅ, "ᝍ$7ᐅ");
          function ᝍ$8ᐅ() {
            while (ᝍ$9ᐅ())
              ;
            return true;
          }
          __name(ᝍ$8ᐅ, "ᝍ$8ᐅ");
          function ᝍ$9ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$10ᐅ() && ᝍlineᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$9ᐅ, "ᝍ$9ᐅ");
          function ᝍ$10ᐅ() {
            return ᝍWSᐅ() || true;
          }
          __name(ᝍ$10ᐅ, "ᝍ$10ᐅ");
          function ᝍ$11ᐅ() {
            return true;
          }
          __name(ᝍ$11ᐅ, "ᝍ$11ᐅ");
          function ᝍlineᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$12ᐅ() && ᝍEOLᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍlineᐅ, "ᝍlineᐅ");
          function ᝍ$12ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$13ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$12ᐅ, "ᝍ$12ᐅ");
          function ᝍ$13ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (!ᝍ$14ᐅ())
              return false;
            if (!ᝍ$21ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$13ᐅ, "ᝍ$13ᐅ");
          function ᝍ$14ᐅ() {
            return parseString(ᝍ$15ᐅ);
          }
          __name(ᝍ$14ᐅ, "ᝍ$14ᐅ");
          function ᝍ$15ᐅ() {
            return ᝍidᐅ();
          }
          __name(ᝍ$15ᐅ, "ᝍ$15ᐅ");
          function ᝍ$21ᐅ() {
            return parseRecord(ᝍ$22ᐅ);
          }
          __name(ᝍ$21ᐅ, "ᝍ$21ᐅ");
          function ᝍ$22ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$23ᐅ() && ᝍruleᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$22ᐅ, "ᝍ$22ᐅ");
          function ᝍ$23ᐅ() {
            return ᝍHSᐅ();
          }
          __name(ᝍ$23ᐅ, "ᝍ$23ᐅ");
          function ᝍruleᐅ() {
            return ᝍassertionᐅ() || ᝍbyteᐅ() || ᝍchar_ᐅ() || ᝍfieldᐅ() || ᝍdualᐅ() || ᝍiterationᐅ() || ᝍlistᐅ() || ᝍmodᐅ() || ᝍnegationᐅ() || ᝍrecordᐅ() || ᝍscalarᐅ() || ᝍselectionᐅ() || ᝍsequenceᐅ() || ᝍstringᐅ() || ᝍutf8_charᐅ() || ᝍutf8_floatᐅ() || ᝍutf8_intᐅ() || ᝍutf8_uecharᐅ();
          }
          __name(ᝍruleᐅ, "ᝍruleᐅ");
          function ᝍassertionᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$29ᐅ() && ᝍ$42ᐅ() && ᝍ$48ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍassertionᐅ, "ᝍassertionᐅ");
          function ᝍ$29ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$31ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$29ᐅ, "ᝍ$29ᐅ");
          function ᝍ$31ᐅ() {
            return parseString(ᝍ$32ᐅ);
          }
          __name(ᝍ$31ᐅ, "ᝍ$31ᐅ");
          function ᝍ$32ᐅ() {
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
            return true;
          }
          __name(ᝍ$32ᐅ, "ᝍ$32ᐅ");
          function ᝍ$42ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$44ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$42ᐅ, "ᝍ$42ᐅ");
          function ᝍ$44ᐅ() {
            return parseList(ᝍ$45ᐅ);
          }
          __name(ᝍ$44ᐅ, "ᝍ$44ᐅ");
          function ᝍ$45ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$46ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$45ᐅ, "ᝍ$45ᐅ");
          function ᝍ$46ᐅ() {
            return parseRecord(ᝍ$47ᐅ);
          }
          __name(ᝍ$46ᐅ, "ᝍ$46ᐅ");
          function ᝍ$47ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$47ᐅ, "ᝍ$47ᐅ");
          function ᝍ$48ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$50ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$48ᐅ, "ᝍ$48ᐅ");
          function ᝍ$50ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$50ᐅ, "ᝍ$50ᐅ");
          function ᝍbyteᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$51ᐅ() && ᝍ$59ᐅ() && ᝍ$65ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍbyteᐅ, "ᝍbyteᐅ");
          function ᝍ$51ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$53ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$51ᐅ, "ᝍ$51ᐅ");
          function ᝍ$53ᐅ() {
            return parseString(ᝍ$54ᐅ);
          }
          __name(ᝍ$53ᐅ, "ᝍ$53ᐅ");
          function ᝍ$54ᐅ() {
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
            return true;
          }
          __name(ᝍ$54ᐅ, "ᝍ$54ᐅ");
          function ᝍ$59ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$61ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$59ᐅ, "ᝍ$59ᐅ");
          function ᝍ$61ᐅ() {
            return parseList(ᝍ$62ᐅ);
          }
          __name(ᝍ$61ᐅ, "ᝍ$61ᐅ");
          function ᝍ$62ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$63ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$62ᐅ, "ᝍ$62ᐅ");
          function ᝍ$63ᐅ() {
            return parseRecord(ᝍ$64ᐅ);
          }
          __name(ᝍ$63ᐅ, "ᝍ$63ᐅ");
          function ᝍ$64ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍbyteRangeᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$64ᐅ, "ᝍ$64ᐅ");
          function ᝍ$65ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$67ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$65ᐅ, "ᝍ$65ᐅ");
          function ᝍ$67ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$67ᐅ, "ᝍ$67ᐅ");
          function ᝍchar_ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$68ᐅ() && ᝍ$76ᐅ() && ᝍ$82ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍchar_ᐅ, "ᝍchar_ᐅ");
          function ᝍ$68ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$70ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$68ᐅ, "ᝍ$68ᐅ");
          function ᝍ$70ᐅ() {
            return parseString(ᝍ$71ᐅ);
          }
          __name(ᝍ$70ᐅ, "ᝍ$70ᐅ");
          function ᝍ$71ᐅ() {
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
            return true;
          }
          __name(ᝍ$71ᐅ, "ᝍ$71ᐅ");
          function ᝍ$76ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$78ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$76ᐅ, "ᝍ$76ᐅ");
          function ᝍ$78ᐅ() {
            return parseList(ᝍ$79ᐅ);
          }
          __name(ᝍ$78ᐅ, "ᝍ$78ᐅ");
          function ᝍ$79ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$80ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$79ᐅ, "ᝍ$79ᐅ");
          function ᝍ$80ᐅ() {
            return parseRecord(ᝍ$81ᐅ);
          }
          __name(ᝍ$80ᐅ, "ᝍ$80ᐅ");
          function ᝍ$81ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍcharRangeᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$81ᐅ, "ᝍ$81ᐅ");
          function ᝍ$82ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$84ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$82ᐅ, "ᝍ$82ᐅ");
          function ᝍ$84ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$84ᐅ, "ᝍ$84ᐅ");
          function ᝍdualᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$85ᐅ() && ᝍ$93ᐅ() && ᝍ$101ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍdualᐅ, "ᝍdualᐅ");
          function ᝍ$85ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$87ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$85ᐅ, "ᝍ$85ᐅ");
          function ᝍ$87ᐅ() {
            return parseString(ᝍ$88ᐅ);
          }
          __name(ᝍ$87ᐅ, "ᝍ$87ᐅ");
          function ᝍ$88ᐅ() {
            var IPOSₒ = IPOS;
            if (readUtf8Codepoint() !== 100)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 117)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 97)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 108)
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = 100;
            OUT[OPOS++] = 117;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 108;
            return true;
          }
          __name(ᝍ$88ᐅ, "ᝍ$88ᐅ");
          function ᝍ$93ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$95ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$93ᐅ, "ᝍ$93ᐅ");
          function ᝍ$95ᐅ() {
            return parseList(ᝍ$96ᐅ);
          }
          __name(ᝍ$95ᐅ, "ᝍ$95ᐅ");
          function ᝍ$96ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$97ᐅ() && ᝍ$99ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$96ᐅ, "ᝍ$96ᐅ");
          function ᝍ$97ᐅ() {
            return parseRecord(ᝍ$98ᐅ);
          }
          __name(ᝍ$97ᐅ, "ᝍ$97ᐅ");
          function ᝍ$98ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$98ᐅ, "ᝍ$98ᐅ");
          function ᝍ$99ᐅ() {
            return parseRecord(ᝍ$100ᐅ);
          }
          __name(ᝍ$99ᐅ, "ᝍ$99ᐅ");
          function ᝍ$100ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$100ᐅ, "ᝍ$100ᐅ");
          function ᝍ$101ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$103ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$101ᐅ, "ᝍ$101ᐅ");
          function ᝍ$103ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$103ᐅ, "ᝍ$103ᐅ");
          function ᝍfieldᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$104ᐅ() && ᝍ$113ᐅ() && ᝍ$121ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍfieldᐅ, "ᝍfieldᐅ");
          function ᝍ$104ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$106ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$104ᐅ, "ᝍ$104ᐅ");
          function ᝍ$106ᐅ() {
            return parseString(ᝍ$107ᐅ);
          }
          __name(ᝍ$106ᐅ, "ᝍ$106ᐅ");
          function ᝍ$107ᐅ() {
            var IPOSₒ = IPOS;
            if (readUtf8Codepoint() !== 102)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 105)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 101)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 108)
              return IPOS = IPOSₒ, false;
            if (readUtf8Codepoint() !== 100)
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = 102;
            OUT[OPOS++] = 105;
            OUT[OPOS++] = 101;
            OUT[OPOS++] = 108;
            OUT[OPOS++] = 100;
            return true;
          }
          __name(ᝍ$107ᐅ, "ᝍ$107ᐅ");
          function ᝍ$113ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$115ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$113ᐅ, "ᝍ$113ᐅ");
          function ᝍ$115ᐅ() {
            return parseList(ᝍ$116ᐅ);
          }
          __name(ᝍ$115ᐅ, "ᝍ$115ᐅ");
          function ᝍ$116ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$117ᐅ() && ᝍ$119ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$116ᐅ, "ᝍ$116ᐅ");
          function ᝍ$117ᐅ() {
            return parseRecord(ᝍ$118ᐅ);
          }
          __name(ᝍ$117ᐅ, "ᝍ$117ᐅ");
          function ᝍ$118ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$118ᐅ, "ᝍ$118ᐅ");
          function ᝍ$119ᐅ() {
            return parseRecord(ᝍ$120ᐅ);
          }
          __name(ᝍ$119ᐅ, "ᝍ$119ᐅ");
          function ᝍ$120ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$120ᐅ, "ᝍ$120ᐅ");
          function ᝍ$121ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$123ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$121ᐅ, "ᝍ$121ᐅ");
          function ᝍ$123ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$123ᐅ, "ᝍ$123ᐅ");
          function ᝍiterationᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$124ᐅ() && ᝍ$137ᐅ() && ᝍ$145ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍiterationᐅ, "ᝍiterationᐅ");
          function ᝍ$124ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$126ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$124ᐅ, "ᝍ$124ᐅ");
          function ᝍ$126ᐅ() {
            return parseString(ᝍ$127ᐅ);
          }
          __name(ᝍ$126ᐅ, "ᝍ$126ᐅ");
          function ᝍ$127ᐅ() {
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
            return true;
          }
          __name(ᝍ$127ᐅ, "ᝍ$127ᐅ");
          function ᝍ$137ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$139ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$137ᐅ, "ᝍ$137ᐅ");
          function ᝍ$139ᐅ() {
            return parseList(ᝍ$140ᐅ);
          }
          __name(ᝍ$139ᐅ, "ᝍ$139ᐅ");
          function ᝍ$140ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$141ᐅ() && ᝍ$143ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$140ᐅ, "ᝍ$140ᐅ");
          function ᝍ$141ᐅ() {
            return parseRecord(ᝍ$142ᐅ);
          }
          __name(ᝍ$141ᐅ, "ᝍ$141ᐅ");
          function ᝍ$142ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍiterationRangeᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$142ᐅ, "ᝍ$142ᐅ");
          function ᝍ$143ᐅ() {
            return parseRecord(ᝍ$144ᐅ);
          }
          __name(ᝍ$143ᐅ, "ᝍ$143ᐅ");
          function ᝍ$144ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$144ᐅ, "ᝍ$144ᐅ");
          function ᝍ$145ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$147ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$145ᐅ, "ᝍ$145ᐅ");
          function ᝍ$147ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$147ᐅ, "ᝍ$147ᐅ");
          function ᝍlistᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$148ᐅ() && ᝍ$156ᐅ() && ᝍ$162ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍlistᐅ, "ᝍlistᐅ");
          function ᝍ$148ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$150ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$148ᐅ, "ᝍ$148ᐅ");
          function ᝍ$150ᐅ() {
            return parseString(ᝍ$151ᐅ);
          }
          __name(ᝍ$150ᐅ, "ᝍ$150ᐅ");
          function ᝍ$151ᐅ() {
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
            return true;
          }
          __name(ᝍ$151ᐅ, "ᝍ$151ᐅ");
          function ᝍ$156ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$158ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$156ᐅ, "ᝍ$156ᐅ");
          function ᝍ$158ᐅ() {
            return parseList(ᝍ$159ᐅ);
          }
          __name(ᝍ$158ᐅ, "ᝍ$158ᐅ");
          function ᝍ$159ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$160ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$159ᐅ, "ᝍ$159ᐅ");
          function ᝍ$160ᐅ() {
            return parseRecord(ᝍ$161ᐅ);
          }
          __name(ᝍ$160ᐅ, "ᝍ$160ᐅ");
          function ᝍ$161ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$161ᐅ, "ᝍ$161ᐅ");
          function ᝍ$162ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$164ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$162ᐅ, "ᝍ$162ᐅ");
          function ᝍ$164ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$164ᐅ, "ᝍ$164ᐅ");
          function ᝍmodᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$165ᐅ() && ᝍ$172ᐅ() && ᝍ$204ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍmodᐅ, "ᝍmodᐅ");
          function ᝍ$165ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$167ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$165ᐅ, "ᝍ$165ᐅ");
          function ᝍ$167ᐅ() {
            return parseString(ᝍ$168ᐅ);
          }
          __name(ᝍ$167ᐅ, "ᝍ$167ᐅ");
          function ᝍ$168ᐅ() {
            OUT[OPOS++] = 109;
            OUT[OPOS++] = 111;
            OUT[OPOS++] = 100;
            return true;
          }
          __name(ᝍ$168ᐅ, "ᝍ$168ᐅ");
          function ᝍ$172ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$174ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$172ᐅ, "ᝍ$172ᐅ");
          function ᝍ$174ᐅ() {
            return parseList(ᝍ$175ᐅ);
          }
          __name(ᝍ$174ᐅ, "ᝍ$174ᐅ");
          function ᝍ$175ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$176ᐅ() && ᝍ$199ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$175ᐅ, "ᝍ$175ᐅ");
          function ᝍ$176ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$177ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$176ᐅ, "ᝍ$176ᐅ");
          function ᝍ$177ᐅ() {
            return parseRecord(ᝍ$178ᐅ);
          }
          __name(ᝍ$177ᐅ, "ᝍ$177ᐅ");
          function ᝍ$178ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍLBᐅ() && ᝍ$179ᐅ() && ᝍRBᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$178ᐅ, "ᝍ$178ᐅ");
          function ᝍ$179ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$180ᐅ() && ᝍ$189ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$179ᐅ, "ᝍ$179ᐅ");
          function ᝍ$180ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$182ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$180ᐅ, "ᝍ$180ᐅ");
          function ᝍ$182ᐅ() {
            return parseString(ᝍ$183ᐅ);
          }
          __name(ᝍ$182ᐅ, "ᝍ$182ᐅ");
          function ᝍ$183ᐅ() {
            OUT[OPOS++] = 67;
            OUT[OPOS++] = 111;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 115;
            OUT[OPOS++] = 116;
            return true;
          }
          __name(ᝍ$183ᐅ, "ᝍ$183ᐅ");
          function ᝍ$189ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "value";
            if (!ᝍ$191ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$189ᐅ, "ᝍ$189ᐅ");
          function ᝍ$191ᐅ() {
            return parseString(ᝍ$192ᐅ);
          }
          __name(ᝍ$191ᐅ, "ᝍ$191ᐅ");
          function ᝍ$192ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$193ᐅ() && ᝍ$194ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$192ᐅ, "ᝍ$192ᐅ");
          function ᝍ$193ᐅ() {
            var IPOSₒ = IPOS;
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            if (cp < 97 || cp > 122)
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = cp;
            return true;
          }
          __name(ᝍ$193ᐅ, "ᝍ$193ᐅ");
          function ᝍ$194ᐅ() {
            while (ᝍ$195ᐅ())
              ;
            return true;
          }
          __name(ᝍ$194ᐅ, "ᝍ$194ᐅ");
          function ᝍ$195ᐅ() {
            var IPOSₒ = IPOS;
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            if ((cp < 97 || cp > 122) && cp !== 46 && (cp < 48 || cp > 57))
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = cp;
            return true;
          }
          __name(ᝍ$195ᐅ, "ᝍ$195ᐅ");
          function ᝍ$199ᐅ() {
            while (ᝍ$200ᐅ())
              ;
            return true;
          }
          __name(ᝍ$199ᐅ, "ᝍ$199ᐅ");
          function ᝍ$200ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$201ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$200ᐅ, "ᝍ$200ᐅ");
          function ᝍ$201ᐅ() {
            return parseRecord(ᝍ$202ᐅ);
          }
          __name(ᝍ$201ᐅ, "ᝍ$201ᐅ");
          function ᝍ$202ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍ$203ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$202ᐅ, "ᝍ$202ᐅ");
          function ᝍ$203ᐅ() {
            return ᝍrefᐅ() || ᝍconstᐅ();
          }
          __name(ᝍ$203ᐅ, "ᝍ$203ᐅ");
          function ᝍ$204ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$206ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$204ᐅ, "ᝍ$204ᐅ");
          function ᝍ$206ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$206ᐅ, "ᝍ$206ᐅ");
          function ᝍnegationᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$207ᐅ() && ᝍ$219ᐅ() && ᝍ$225ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍnegationᐅ, "ᝍnegationᐅ");
          function ᝍ$207ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$209ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$207ᐅ, "ᝍ$207ᐅ");
          function ᝍ$209ᐅ() {
            return parseString(ᝍ$210ᐅ);
          }
          __name(ᝍ$209ᐅ, "ᝍ$209ᐅ");
          function ᝍ$210ᐅ() {
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
            return true;
          }
          __name(ᝍ$210ᐅ, "ᝍ$210ᐅ");
          function ᝍ$219ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$221ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$219ᐅ, "ᝍ$219ᐅ");
          function ᝍ$221ᐅ() {
            return parseList(ᝍ$222ᐅ);
          }
          __name(ᝍ$221ᐅ, "ᝍ$221ᐅ");
          function ᝍ$222ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$223ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$222ᐅ, "ᝍ$222ᐅ");
          function ᝍ$223ᐅ() {
            return parseRecord(ᝍ$224ᐅ);
          }
          __name(ᝍ$223ᐅ, "ᝍ$223ᐅ");
          function ᝍ$224ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$224ᐅ, "ᝍ$224ᐅ");
          function ᝍ$225ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$227ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$225ᐅ, "ᝍ$225ᐅ");
          function ᝍ$227ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$227ᐅ, "ᝍ$227ᐅ");
          function ᝍrecordᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$228ᐅ() && ᝍ$238ᐅ() && ᝍ$244ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍrecordᐅ, "ᝍrecordᐅ");
          function ᝍ$228ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$230ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$228ᐅ, "ᝍ$228ᐅ");
          function ᝍ$230ᐅ() {
            return parseString(ᝍ$231ᐅ);
          }
          __name(ᝍ$230ᐅ, "ᝍ$230ᐅ");
          function ᝍ$231ᐅ() {
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
            return true;
          }
          __name(ᝍ$231ᐅ, "ᝍ$231ᐅ");
          function ᝍ$238ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$240ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$238ᐅ, "ᝍ$238ᐅ");
          function ᝍ$240ᐅ() {
            return parseList(ᝍ$241ᐅ);
          }
          __name(ᝍ$240ᐅ, "ᝍ$240ᐅ");
          function ᝍ$241ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$242ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$241ᐅ, "ᝍ$241ᐅ");
          function ᝍ$242ᐅ() {
            return parseRecord(ᝍ$243ᐅ);
          }
          __name(ᝍ$242ᐅ, "ᝍ$242ᐅ");
          function ᝍ$243ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$243ᐅ, "ᝍ$243ᐅ");
          function ᝍ$244ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$246ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$244ᐅ, "ᝍ$244ᐅ");
          function ᝍ$246ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$246ᐅ, "ᝍ$246ᐅ");
          function ᝍscalarᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$247ᐅ() && ᝍ$257ᐅ() && ᝍ$263ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍscalarᐅ, "ᝍscalarᐅ");
          function ᝍ$247ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$249ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$247ᐅ, "ᝍ$247ᐅ");
          function ᝍ$249ᐅ() {
            return parseString(ᝍ$250ᐅ);
          }
          __name(ᝍ$249ᐅ, "ᝍ$249ᐅ");
          function ᝍ$250ᐅ() {
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
            return true;
          }
          __name(ᝍ$250ᐅ, "ᝍ$250ᐅ");
          function ᝍ$257ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$259ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$257ᐅ, "ᝍ$257ᐅ");
          function ᝍ$259ᐅ() {
            return parseList(ᝍ$260ᐅ);
          }
          __name(ᝍ$259ᐅ, "ᝍ$259ᐅ");
          function ᝍ$260ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$261ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$260ᐅ, "ᝍ$260ᐅ");
          function ᝍ$261ᐅ() {
            return parseRecord(ᝍ$262ᐅ);
          }
          __name(ᝍ$261ᐅ, "ᝍ$261ᐅ");
          function ᝍ$262ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍconstᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$262ᐅ, "ᝍ$262ᐅ");
          function ᝍ$263ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$265ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$263ᐅ, "ᝍ$263ᐅ");
          function ᝍ$265ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$265ᐅ, "ᝍ$265ᐅ");
          function ᝍselectionᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$266ᐅ() && ᝍ$279ᐅ() && ᝍ$288ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍselectionᐅ, "ᝍselectionᐅ");
          function ᝍ$266ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$268ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$266ᐅ, "ᝍ$266ᐅ");
          function ᝍ$268ᐅ() {
            return parseString(ᝍ$269ᐅ);
          }
          __name(ᝍ$268ᐅ, "ᝍ$268ᐅ");
          function ᝍ$269ᐅ() {
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
            return true;
          }
          __name(ᝍ$269ᐅ, "ᝍ$269ᐅ");
          function ᝍ$279ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$281ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$279ᐅ, "ᝍ$279ᐅ");
          function ᝍ$281ᐅ() {
            return parseList(ᝍ$282ᐅ);
          }
          __name(ᝍ$281ᐅ, "ᝍ$281ᐅ");
          function ᝍ$282ᐅ() {
            return ᝍ$283ᐅ() || ᝍ$287ᐅ();
          }
          __name(ᝍ$282ᐅ, "ᝍ$282ᐅ");
          function ᝍ$283ᐅ() {
            if (!ᝍ$284ᐅ())
              return false;
            while (true) {
              if (!ᝍ$284ᐅ())
                return true;
            }
          }
          __name(ᝍ$283ᐅ, "ᝍ$283ᐅ");
          function ᝍ$284ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$285ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$284ᐅ, "ᝍ$284ᐅ");
          function ᝍ$285ᐅ() {
            return parseRecord(ᝍ$286ᐅ);
          }
          __name(ᝍ$285ᐅ, "ᝍ$285ᐅ");
          function ᝍ$286ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$286ᐅ, "ᝍ$286ᐅ");
          function ᝍ$287ᐅ() {
            return true;
          }
          __name(ᝍ$287ᐅ, "ᝍ$287ᐅ");
          function ᝍ$288ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$290ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$288ᐅ, "ᝍ$288ᐅ");
          function ᝍ$290ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$290ᐅ, "ᝍ$290ᐅ");
          function ᝍsequenceᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$291ᐅ() && ᝍ$303ᐅ() && ᝍ$312ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍsequenceᐅ, "ᝍsequenceᐅ");
          function ᝍ$291ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$293ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$291ᐅ, "ᝍ$291ᐅ");
          function ᝍ$293ᐅ() {
            return parseString(ᝍ$294ᐅ);
          }
          __name(ᝍ$293ᐅ, "ᝍ$293ᐅ");
          function ᝍ$294ᐅ() {
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
            return true;
          }
          __name(ᝍ$294ᐅ, "ᝍ$294ᐅ");
          function ᝍ$303ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$305ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$303ᐅ, "ᝍ$303ᐅ");
          function ᝍ$305ᐅ() {
            return parseList(ᝍ$306ᐅ);
          }
          __name(ᝍ$305ᐅ, "ᝍ$305ᐅ");
          function ᝍ$306ᐅ() {
            return ᝍ$307ᐅ() || ᝍ$311ᐅ();
          }
          __name(ᝍ$306ᐅ, "ᝍ$306ᐅ");
          function ᝍ$307ᐅ() {
            if (!ᝍ$308ᐅ())
              return false;
            while (true) {
              if (!ᝍ$308ᐅ())
                return true;
            }
          }
          __name(ᝍ$307ᐅ, "ᝍ$307ᐅ");
          function ᝍ$308ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$309ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$308ᐅ, "ᝍ$308ᐅ");
          function ᝍ$309ᐅ() {
            return parseRecord(ᝍ$310ᐅ);
          }
          __name(ᝍ$309ᐅ, "ᝍ$309ᐅ");
          function ᝍ$310ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$310ᐅ, "ᝍ$310ᐅ");
          function ᝍ$311ᐅ() {
            return true;
          }
          __name(ᝍ$311ᐅ, "ᝍ$311ᐅ");
          function ᝍ$312ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$314ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$312ᐅ, "ᝍ$312ᐅ");
          function ᝍ$314ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$314ᐅ, "ᝍ$314ᐅ");
          function ᝍstringᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$315ᐅ() && ᝍ$325ᐅ() && ᝍ$331ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍstringᐅ, "ᝍstringᐅ");
          function ᝍ$315ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$317ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$315ᐅ, "ᝍ$315ᐅ");
          function ᝍ$317ᐅ() {
            return parseString(ᝍ$318ᐅ);
          }
          __name(ᝍ$317ᐅ, "ᝍ$317ᐅ");
          function ᝍ$318ᐅ() {
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
            return true;
          }
          __name(ᝍ$318ᐅ, "ᝍ$318ᐅ");
          function ᝍ$325ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$327ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$325ᐅ, "ᝍ$325ᐅ");
          function ᝍ$327ᐅ() {
            return parseList(ᝍ$328ᐅ);
          }
          __name(ᝍ$327ᐅ, "ᝍ$327ᐅ");
          function ᝍ$328ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$329ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$328ᐅ, "ᝍ$328ᐅ");
          function ᝍ$329ᐅ() {
            return parseRecord(ᝍ$330ᐅ);
          }
          __name(ᝍ$329ᐅ, "ᝍ$329ᐅ");
          function ᝍ$330ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍrefᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$330ᐅ, "ᝍ$330ᐅ");
          function ᝍ$331ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$333ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$331ᐅ, "ᝍ$331ᐅ");
          function ᝍ$333ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$333ᐅ, "ᝍ$333ᐅ");
          function ᝍutf8_charᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$334ᐅ() && ᝍ$347ᐅ() && ᝍ$353ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍutf8_charᐅ, "ᝍutf8_charᐅ");
          function ᝍ$334ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$336ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$334ᐅ, "ᝍ$334ᐅ");
          function ᝍ$336ᐅ() {
            return parseString(ᝍ$337ᐅ);
          }
          __name(ᝍ$336ᐅ, "ᝍ$336ᐅ");
          function ᝍ$337ᐅ() {
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
            return true;
          }
          __name(ᝍ$337ᐅ, "ᝍ$337ᐅ");
          function ᝍ$347ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$349ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$347ᐅ, "ᝍ$347ᐅ");
          function ᝍ$349ᐅ() {
            return parseList(ᝍ$350ᐅ);
          }
          __name(ᝍ$349ᐅ, "ᝍ$349ᐅ");
          function ᝍ$350ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$351ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$350ᐅ, "ᝍ$350ᐅ");
          function ᝍ$351ᐅ() {
            return parseRecord(ᝍ$352ᐅ);
          }
          __name(ᝍ$351ᐅ, "ᝍ$351ᐅ");
          function ᝍ$352ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍcharRangeᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$352ᐅ, "ᝍ$352ᐅ");
          function ᝍ$353ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$355ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$353ᐅ, "ᝍ$353ᐅ");
          function ᝍ$355ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$355ᐅ, "ᝍ$355ᐅ");
          function ᝍutf8_floatᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$356ᐅ() && ᝍ$370ᐅ() && ᝍ$374ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍutf8_floatᐅ, "ᝍutf8_floatᐅ");
          function ᝍ$356ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$358ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$356ᐅ, "ᝍ$356ᐅ");
          function ᝍ$358ᐅ() {
            return parseString(ᝍ$359ᐅ);
          }
          __name(ᝍ$358ᐅ, "ᝍ$358ᐅ");
          function ᝍ$359ᐅ() {
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
            return true;
          }
          __name(ᝍ$359ᐅ, "ᝍ$359ᐅ");
          function ᝍ$370ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$372ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$370ᐅ, "ᝍ$370ᐅ");
          function ᝍ$372ᐅ() {
            return parseList(ᝍ$373ᐅ);
          }
          __name(ᝍ$372ᐅ, "ᝍ$372ᐅ");
          function ᝍ$373ᐅ() {
            return true;
          }
          __name(ᝍ$373ᐅ, "ᝍ$373ᐅ");
          function ᝍ$374ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$376ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$374ᐅ, "ᝍ$374ᐅ");
          function ᝍ$376ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$376ᐅ, "ᝍ$376ᐅ");
          function ᝍutf8_intᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$377ᐅ() && ᝍ$389ᐅ() && ᝍ$434ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍutf8_intᐅ, "ᝍutf8_intᐅ");
          function ᝍ$377ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$379ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$377ᐅ, "ᝍ$377ᐅ");
          function ᝍ$379ᐅ() {
            return parseString(ᝍ$380ᐅ);
          }
          __name(ᝍ$379ᐅ, "ᝍ$379ᐅ");
          function ᝍ$380ᐅ() {
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
            return true;
          }
          __name(ᝍ$380ᐅ, "ᝍ$380ᐅ");
          function ᝍ$389ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$391ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$389ᐅ, "ᝍ$389ᐅ");
          function ᝍ$391ᐅ() {
            return parseList(ᝍ$392ᐅ);
          }
          __name(ᝍ$391ᐅ, "ᝍ$391ᐅ");
          function ᝍ$392ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$393ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$392ᐅ, "ᝍ$392ᐅ");
          function ᝍ$393ᐅ() {
            return parseRecord(ᝍ$394ᐅ);
          }
          __name(ᝍ$393ᐅ, "ᝍ$393ᐅ");
          function ᝍ$394ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$395ᐅ() && ᝍ$410ᐅ() && ᝍ$421ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$394ᐅ, "ᝍ$394ᐅ");
          function ᝍ$395ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$397ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$395ᐅ, "ᝍ$395ᐅ");
          function ᝍ$397ᐅ() {
            return parseString(ᝍ$398ᐅ);
          }
          __name(ᝍ$397ᐅ, "ᝍ$397ᐅ");
          function ᝍ$398ᐅ() {
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
            return true;
          }
          __name(ᝍ$398ᐅ, "ᝍ$398ᐅ");
          function ᝍ$410ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (!ᝍ$411ᐅ())
              return false;
            if (!ᝍ$418ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$410ᐅ, "ᝍ$410ᐅ");
          function ᝍ$411ᐅ() {
            return parseString(ᝍ$412ᐅ);
          }
          __name(ᝍ$411ᐅ, "ᝍ$411ᐅ");
          function ᝍ$412ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍ$413ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$412ᐅ, "ᝍ$412ᐅ");
          function ᝍ$413ᐅ() {
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
            return true;
          }
          __name(ᝍ$413ᐅ, "ᝍ$413ᐅ");
          function ᝍ$418ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$419ᐅ() && ᝍEQᐅ() && ᝍ$420ᐅ() && ᝍintDecᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$418ᐅ, "ᝍ$418ᐅ");
          function ᝍ$419ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$419ᐅ, "ᝍ$419ᐅ");
          function ᝍ$420ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$420ᐅ, "ᝍ$420ᐅ");
          function ᝍ$421ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (!ᝍ$422ᐅ())
              return false;
            if (!ᝍ$431ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$421ᐅ, "ᝍ$421ᐅ");
          function ᝍ$422ᐅ() {
            return parseString(ᝍ$423ᐅ);
          }
          __name(ᝍ$422ᐅ, "ᝍ$422ᐅ");
          function ᝍ$423ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍ$424ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$423ᐅ, "ᝍ$423ᐅ");
          function ᝍ$424ᐅ() {
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
            return true;
          }
          __name(ᝍ$424ᐅ, "ᝍ$424ᐅ");
          function ᝍ$431ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$432ᐅ() && ᝍEQᐅ() && ᝍ$433ᐅ() && ᝍboolᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$431ᐅ, "ᝍ$431ᐅ");
          function ᝍ$432ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$432ᐅ, "ᝍ$432ᐅ");
          function ᝍ$433ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$433ᐅ, "ᝍ$433ᐅ");
          function ᝍ$434ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$436ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$434ᐅ, "ᝍ$434ᐅ");
          function ᝍ$436ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$436ᐅ, "ᝍ$436ᐅ");
          function ᝍutf8_uecharᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$437ᐅ() && ᝍ$452ᐅ() && ᝍ$513ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍutf8_uecharᐅ, "ᝍutf8_uecharᐅ");
          function ᝍ$437ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$439ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$437ᐅ, "ᝍ$437ᐅ");
          function ᝍ$439ᐅ() {
            return parseString(ᝍ$440ᐅ);
          }
          __name(ᝍ$439ᐅ, "ᝍ$439ᐅ");
          function ᝍ$440ᐅ() {
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
            return true;
          }
          __name(ᝍ$440ᐅ, "ᝍ$440ᐅ");
          function ᝍ$452ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "args";
            if (!ᝍ$454ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$452ᐅ, "ᝍ$452ᐅ");
          function ᝍ$454ᐅ() {
            return parseList(ᝍ$455ᐅ);
          }
          __name(ᝍ$454ᐅ, "ᝍ$454ᐅ");
          function ᝍ$455ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$456ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$455ᐅ, "ᝍ$455ᐅ");
          function ᝍ$456ᐅ() {
            return parseRecord(ᝍ$457ᐅ);
          }
          __name(ᝍ$456ᐅ, "ᝍ$456ᐅ");
          function ᝍ$457ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$458ᐅ() && ᝍ$476ᐅ() && ᝍ$487ᐅ() && ᝍ$500ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$457ᐅ, "ᝍ$457ᐅ");
          function ᝍ$458ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$460ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$458ᐅ, "ᝍ$458ᐅ");
          function ᝍ$460ᐅ() {
            return parseString(ᝍ$461ᐅ);
          }
          __name(ᝍ$460ᐅ, "ᝍ$460ᐅ");
          function ᝍ$461ᐅ() {
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
            return true;
          }
          __name(ᝍ$461ᐅ, "ᝍ$461ᐅ");
          function ᝍ$476ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (!ᝍ$477ᐅ())
              return false;
            if (!ᝍ$484ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$476ᐅ, "ᝍ$476ᐅ");
          function ᝍ$477ᐅ() {
            return parseString(ᝍ$478ᐅ);
          }
          __name(ᝍ$477ᐅ, "ᝍ$477ᐅ");
          function ᝍ$478ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍ$479ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$478ᐅ, "ᝍ$478ᐅ");
          function ᝍ$479ᐅ() {
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
            return true;
          }
          __name(ᝍ$479ᐅ, "ᝍ$479ᐅ");
          function ᝍ$484ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$485ᐅ() && ᝍEQᐅ() && ᝍ$486ᐅ() && ᝍintDecᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$484ᐅ, "ᝍ$484ᐅ");
          function ᝍ$485ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$485ᐅ, "ᝍ$485ᐅ");
          function ᝍ$486ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$486ᐅ, "ᝍ$486ᐅ");
          function ᝍ$487ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (!ᝍ$488ᐅ())
              return false;
            if (!ᝍ$497ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$487ᐅ, "ᝍ$487ᐅ");
          function ᝍ$488ᐅ() {
            return parseString(ᝍ$489ᐅ);
          }
          __name(ᝍ$488ᐅ, "ᝍ$488ᐅ");
          function ᝍ$489ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍ$490ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$489ᐅ, "ᝍ$489ᐅ");
          function ᝍ$490ᐅ() {
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
            return true;
          }
          __name(ᝍ$490ᐅ, "ᝍ$490ᐅ");
          function ᝍ$497ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$498ᐅ() && ᝍEQᐅ() && ᝍ$499ᐅ() && ᝍintDecᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$497ᐅ, "ᝍ$497ᐅ");
          function ᝍ$498ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$498ᐅ, "ᝍ$498ᐅ");
          function ᝍ$499ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$499ᐅ, "ᝍ$499ᐅ");
          function ᝍ$500ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (!ᝍ$501ᐅ())
              return false;
            if (!ᝍ$510ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$500ᐅ, "ᝍ$500ᐅ");
          function ᝍ$501ᐅ() {
            return parseString(ᝍ$502ᐅ);
          }
          __name(ᝍ$501ᐅ, "ᝍ$501ᐅ");
          function ᝍ$502ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍHSᐅ() && ᝍ$503ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$502ᐅ, "ᝍ$502ᐅ");
          function ᝍ$503ᐅ() {
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
            return true;
          }
          __name(ᝍ$503ᐅ, "ᝍ$503ᐅ");
          function ᝍ$510ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$511ᐅ() && ᝍEQᐅ() && ᝍ$512ᐅ() && ᝍintDecᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$510ᐅ, "ᝍ$510ᐅ");
          function ᝍ$511ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$511ᐅ, "ᝍ$511ᐅ");
          function ᝍ$512ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$512ᐅ, "ᝍ$512ᐅ");
          function ᝍ$513ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "meta";
            if (!ᝍ$515ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$513ᐅ, "ᝍ$513ᐅ");
          function ᝍ$515ᐅ() {
            return parseRecord(ᝍmetaᐅ);
          }
          __name(ᝍ$515ᐅ, "ᝍ$515ᐅ");
          function ᝍconstᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$516ᐅ() && ᝍ$525ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍconstᐅ, "ᝍconstᐅ");
          function ᝍ$516ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$518ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$516ᐅ, "ᝍ$516ᐅ");
          function ᝍ$518ᐅ() {
            return parseString(ᝍ$519ᐅ);
          }
          __name(ᝍ$518ᐅ, "ᝍ$518ᐅ");
          function ᝍ$519ᐅ() {
            OUT[OPOS++] = 67;
            OUT[OPOS++] = 111;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 115;
            OUT[OPOS++] = 116;
            return true;
          }
          __name(ᝍ$519ᐅ, "ᝍ$519ᐅ");
          function ᝍ$525ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "value";
            if (!ᝍ$527ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$525ᐅ, "ᝍ$525ᐅ");
          function ᝍ$527ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$528ᐅ() && ᝍ$529ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$527ᐅ, "ᝍ$527ᐅ");
          function ᝍ$528ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$528ᐅ, "ᝍ$528ᐅ");
          function ᝍ$529ᐅ() {
            return ᝍ$530ᐅ() || ᝍnumᐅ() || ᝍboolᐅ() || ᝍnull_ᐅ();
          }
          __name(ᝍ$529ᐅ, "ᝍ$529ᐅ");
          function ᝍ$530ᐅ() {
            return parseString(ᝍstrᐅ);
          }
          __name(ᝍ$530ᐅ, "ᝍ$530ᐅ");
          function ᝍbyteRangeᐅ() {
            return ᝍ$531ᐅ() || ᝍ$546ᐅ() || ᝍ$562ᐅ() || ᝍ$578ᐅ();
          }
          __name(ᝍbyteRangeᐅ, "ᝍbyteRangeᐅ");
          function ᝍ$531ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$532ᐅ() && ᝍ$541ᐅ() && ᝍ$543ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$531ᐅ, "ᝍ$531ᐅ");
          function ᝍ$532ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$534ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$532ᐅ, "ᝍ$532ᐅ");
          function ᝍ$534ᐅ() {
            return parseString(ᝍ$535ᐅ);
          }
          __name(ᝍ$534ᐅ, "ᝍ$534ᐅ");
          function ᝍ$535ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$535ᐅ, "ᝍ$535ᐅ");
          function ᝍ$541ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍintHexᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$541ᐅ, "ᝍ$541ᐅ");
          function ᝍ$543ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$545ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$543ᐅ, "ᝍ$543ᐅ");
          function ᝍ$545ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍintHexᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$545ᐅ, "ᝍ$545ᐅ");
          function ᝍ$546ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$547ᐅ() && ᝍ$556ᐅ() && ᝍ$558ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$546ᐅ, "ᝍ$546ᐅ");
          function ᝍ$547ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$549ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$547ᐅ, "ᝍ$547ᐅ");
          function ᝍ$549ᐅ() {
            return parseString(ᝍ$550ᐅ);
          }
          __name(ᝍ$549ᐅ, "ᝍ$549ᐅ");
          function ᝍ$550ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$550ᐅ, "ᝍ$550ᐅ");
          function ᝍ$556ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍintHexᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$556ᐅ, "ᝍ$556ᐅ");
          function ᝍ$558ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$560ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$558ᐅ, "ᝍ$558ᐅ");
          function ᝍ$560ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍ$561ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$560ᐅ, "ᝍ$560ᐅ");
          function ᝍ$561ᐅ() {
            OUT[OPOS++] = 255;
            return true;
          }
          __name(ᝍ$561ᐅ, "ᝍ$561ᐅ");
          function ᝍ$562ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$563ᐅ() && ᝍ$572ᐅ() && ᝍ$575ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$562ᐅ, "ᝍ$562ᐅ");
          function ᝍ$563ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$565ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$563ᐅ, "ᝍ$563ᐅ");
          function ᝍ$565ᐅ() {
            return parseString(ᝍ$566ᐅ);
          }
          __name(ᝍ$565ᐅ, "ᝍ$565ᐅ");
          function ᝍ$566ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$566ᐅ, "ᝍ$566ᐅ");
          function ᝍ$572ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍ$574ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$572ᐅ, "ᝍ$572ᐅ");
          function ᝍ$574ᐅ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᝍ$574ᐅ, "ᝍ$574ᐅ");
          function ᝍ$575ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$577ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$575ᐅ, "ᝍ$575ᐅ");
          function ᝍ$577ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍintHexᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$577ᐅ, "ᝍ$577ᐅ");
          function ᝍ$578ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$579ᐅ() && ᝍ$588ᐅ() && ᝍ$591ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$578ᐅ, "ᝍ$578ᐅ");
          function ᝍ$579ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$581ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$579ᐅ, "ᝍ$579ᐅ");
          function ᝍ$581ᐅ() {
            return parseString(ᝍ$582ᐅ);
          }
          __name(ᝍ$581ᐅ, "ᝍ$581ᐅ");
          function ᝍ$582ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$582ᐅ, "ᝍ$582ᐅ");
          function ᝍ$588ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍ$590ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$588ᐅ, "ᝍ$588ᐅ");
          function ᝍ$590ᐅ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᝍ$590ᐅ, "ᝍ$590ᐅ");
          function ᝍ$591ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$593ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$591ᐅ, "ᝍ$591ᐅ");
          function ᝍ$593ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍ$594ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$593ᐅ, "ᝍ$593ᐅ");
          function ᝍ$594ᐅ() {
            OUT[OPOS++] = 255;
            return true;
          }
          __name(ᝍ$594ᐅ, "ᝍ$594ᐅ");
          function ᝍcharRangeᐅ() {
            return ᝍ$595ᐅ() || ᝍ$610ᐅ() || ᝍ$626ᐅ() || ᝍ$642ᐅ();
          }
          __name(ᝍcharRangeᐅ, "ᝍcharRangeᐅ");
          function ᝍ$595ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$596ᐅ() && ᝍ$605ᐅ() && ᝍ$607ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$595ᐅ, "ᝍ$595ᐅ");
          function ᝍ$596ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$598ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$596ᐅ, "ᝍ$596ᐅ");
          function ᝍ$598ᐅ() {
            return parseString(ᝍ$599ᐅ);
          }
          __name(ᝍ$598ᐅ, "ᝍ$598ᐅ");
          function ᝍ$599ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$599ᐅ, "ᝍ$599ᐅ");
          function ᝍ$605ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍintHexᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$605ᐅ, "ᝍ$605ᐅ");
          function ᝍ$607ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$609ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$607ᐅ, "ᝍ$607ᐅ");
          function ᝍ$609ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍintHexᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$609ᐅ, "ᝍ$609ᐅ");
          function ᝍ$610ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$611ᐅ() && ᝍ$620ᐅ() && ᝍ$622ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$610ᐅ, "ᝍ$610ᐅ");
          function ᝍ$611ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$613ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$611ᐅ, "ᝍ$611ᐅ");
          function ᝍ$613ᐅ() {
            return parseString(ᝍ$614ᐅ);
          }
          __name(ᝍ$613ᐅ, "ᝍ$613ᐅ");
          function ᝍ$614ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$614ᐅ, "ᝍ$614ᐅ");
          function ᝍ$620ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍintHexᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$620ᐅ, "ᝍ$620ᐅ");
          function ᝍ$622ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$624ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$622ᐅ, "ᝍ$622ᐅ");
          function ᝍ$624ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍ$625ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$624ᐅ, "ᝍ$624ᐅ");
          function ᝍ$625ᐅ() {
            OUT[OPOS++] = 1114111;
            return true;
          }
          __name(ᝍ$625ᐅ, "ᝍ$625ᐅ");
          function ᝍ$626ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$627ᐅ() && ᝍ$636ᐅ() && ᝍ$639ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$626ᐅ, "ᝍ$626ᐅ");
          function ᝍ$627ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$629ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$627ᐅ, "ᝍ$627ᐅ");
          function ᝍ$629ᐅ() {
            return parseString(ᝍ$630ᐅ);
          }
          __name(ᝍ$629ᐅ, "ᝍ$629ᐅ");
          function ᝍ$630ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$630ᐅ, "ᝍ$630ᐅ");
          function ᝍ$636ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍ$638ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$636ᐅ, "ᝍ$636ᐅ");
          function ᝍ$638ᐅ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᝍ$638ᐅ, "ᝍ$638ᐅ");
          function ᝍ$639ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$641ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$639ᐅ, "ᝍ$639ᐅ");
          function ᝍ$641ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍintHexᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$641ᐅ, "ᝍ$641ᐅ");
          function ᝍ$642ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$643ᐅ() && ᝍ$652ᐅ() && ᝍ$655ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$642ᐅ, "ᝍ$642ᐅ");
          function ᝍ$643ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$645ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$643ᐅ, "ᝍ$643ᐅ");
          function ᝍ$645ᐅ() {
            return parseString(ᝍ$646ᐅ);
          }
          __name(ᝍ$645ᐅ, "ᝍ$645ᐅ");
          function ᝍ$646ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$646ᐅ, "ᝍ$646ᐅ");
          function ᝍ$652ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍ$654ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$652ᐅ, "ᝍ$652ᐅ");
          function ᝍ$654ᐅ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᝍ$654ᐅ, "ᝍ$654ᐅ");
          function ᝍ$655ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$657ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$655ᐅ, "ᝍ$655ᐅ");
          function ᝍ$657ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍ$658ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$657ᐅ, "ᝍ$657ᐅ");
          function ᝍ$658ᐅ() {
            OUT[OPOS++] = 1114111;
            return true;
          }
          __name(ᝍ$658ᐅ, "ᝍ$658ᐅ");
          function ᝍiterationRangeᐅ() {
            return ᝍ$659ᐅ() || ᝍ$674ᐅ() || ᝍ$690ᐅ() || ᝍ$706ᐅ();
          }
          __name(ᝍiterationRangeᐅ, "ᝍiterationRangeᐅ");
          function ᝍ$659ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$660ᐅ() && ᝍ$669ᐅ() && ᝍ$671ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$659ᐅ, "ᝍ$659ᐅ");
          function ᝍ$660ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$662ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$660ᐅ, "ᝍ$660ᐅ");
          function ᝍ$662ᐅ() {
            return parseString(ᝍ$663ᐅ);
          }
          __name(ᝍ$662ᐅ, "ᝍ$662ᐅ");
          function ᝍ$663ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$663ᐅ, "ᝍ$663ᐅ");
          function ᝍ$669ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍintDecᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$669ᐅ, "ᝍ$669ᐅ");
          function ᝍ$671ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$673ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$671ᐅ, "ᝍ$671ᐅ");
          function ᝍ$673ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍintDecᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$673ᐅ, "ᝍ$673ᐅ");
          function ᝍ$674ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$675ᐅ() && ᝍ$684ᐅ() && ᝍ$686ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$674ᐅ, "ᝍ$674ᐅ");
          function ᝍ$675ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$677ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$675ᐅ, "ᝍ$675ᐅ");
          function ᝍ$677ᐅ() {
            return parseString(ᝍ$678ᐅ);
          }
          __name(ᝍ$677ᐅ, "ᝍ$677ᐅ");
          function ᝍ$678ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$678ᐅ, "ᝍ$678ᐅ");
          function ᝍ$684ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍintDecᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$684ᐅ, "ᝍ$684ᐅ");
          function ᝍ$686ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$688ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$686ᐅ, "ᝍ$686ᐅ");
          function ᝍ$688ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍ$689ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$688ᐅ, "ᝍ$688ᐅ");
          function ᝍ$689ᐅ() {
            OUT[OPOS++] = 9007199254740991;
            return true;
          }
          __name(ᝍ$689ᐅ, "ᝍ$689ᐅ");
          function ᝍ$690ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$691ᐅ() && ᝍ$700ᐅ() && ᝍ$703ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$690ᐅ, "ᝍ$690ᐅ");
          function ᝍ$691ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$693ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$691ᐅ, "ᝍ$691ᐅ");
          function ᝍ$693ᐅ() {
            return parseString(ᝍ$694ᐅ);
          }
          __name(ᝍ$693ᐅ, "ᝍ$693ᐅ");
          function ᝍ$694ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$694ᐅ, "ᝍ$694ᐅ");
          function ᝍ$700ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍ$702ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$700ᐅ, "ᝍ$700ᐅ");
          function ᝍ$702ᐅ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᝍ$702ᐅ, "ᝍ$702ᐅ");
          function ᝍ$703ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$705ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$703ᐅ, "ᝍ$703ᐅ");
          function ᝍ$705ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍintDecᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$705ᐅ, "ᝍ$705ᐅ");
          function ᝍ$706ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$707ᐅ() && ᝍ$716ᐅ() && ᝍ$719ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$706ᐅ, "ᝍ$706ᐅ");
          function ᝍ$707ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$709ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$707ᐅ, "ᝍ$707ᐅ");
          function ᝍ$709ᐅ() {
            return parseString(ᝍ$710ᐅ);
          }
          __name(ᝍ$709ᐅ, "ᝍ$709ᐅ");
          function ᝍ$710ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 103;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᝍ$710ᐅ, "ᝍ$710ᐅ");
          function ᝍ$716ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "min";
            if (!ᝍ$718ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$716ᐅ, "ᝍ$716ᐅ");
          function ᝍ$718ᐅ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᝍ$718ᐅ, "ᝍ$718ᐅ");
          function ᝍ$719ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "max";
            if (!ᝍ$721ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$719ᐅ, "ᝍ$719ᐅ");
          function ᝍ$721ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍDDᐅ() && ᝍ$722ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$721ᐅ, "ᝍ$721ᐅ");
          function ᝍ$722ᐅ() {
            OUT[OPOS++] = 9007199254740991;
            return true;
          }
          __name(ᝍ$722ᐅ, "ᝍ$722ᐅ");
          function ᝍmetaᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$723ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍmetaᐅ, "ᝍmetaᐅ");
          function ᝍ$723ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "note";
            if (!ᝍ$725ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$723ᐅ, "ᝍ$723ᐅ");
          function ᝍ$725ᐅ() {
            return parseString(ᝍnoteᐅ);
          }
          __name(ᝍ$725ᐅ, "ᝍ$725ᐅ");
          function ᝍnoteᐅ() {
            return ᝍnote$startᐅ();
          }
          __name(ᝍnoteᐅ, "ᝍnoteᐅ");
          function ᝍnote$startᐅ() {
            return ᝍ$726ᐅ() || ᝍnote$noCommentᐅ();
          }
          __name(ᝍnote$startᐅ, "ᝍnote$startᐅ");
          function ᝍ$726ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍnote$commentStartᐅ() && ᝍ$727ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$726ᐅ, "ᝍ$726ᐅ");
          function ᝍ$727ᐅ() {
            if (!ᝍnote$commentCharᐅ())
              return false;
            while (true) {
              if (!ᝍnote$commentCharᐅ())
                return true;
            }
          }
          __name(ᝍ$727ᐅ, "ᝍ$727ᐅ");
          function ᝍnote$commentStartᐅ() {
            return ᝍ$728ᐅ();
          }
          __name(ᝍnote$commentStartᐅ, "ᝍnote$commentStartᐅ");
          function ᝍ$728ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$729ᐅ() && ᝍ$730ᐅ() && ᝍ$731ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$728ᐅ, "ᝍ$728ᐅ");
          function ᝍ$729ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$729ᐅ, "ᝍ$729ᐅ");
          function ᝍ$730ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 35)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$730ᐅ, "ᝍ$730ᐅ");
          function ᝍ$731ᐅ() {
            return ᝍ$732ᐅ() || true;
          }
          __name(ᝍ$731ᐅ, "ᝍ$731ᐅ");
          function ᝍ$732ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 32)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$732ᐅ, "ᝍ$732ᐅ");
          function ᝍnote$commentCharᐅ() {
            return ᝍnote$escapedCrᐅ() || ᝍnote$escapedLfᐅ() || ᝍnote$nonNewlineCharᐅ();
          }
          __name(ᝍnote$commentCharᐅ, "ᝍnote$commentCharᐅ");
          function ᝍnote$escapedCrᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$740ᐅ() && ᝍ$743ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍnote$escapedCrᐅ, "ᝍnote$escapedCrᐅ");
          function ᝍ$740ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 114)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$740ᐅ, "ᝍ$740ᐅ");
          function ᝍ$743ᐅ() {
            OUT[OPOS++] = 13;
            return true;
          }
          __name(ᝍ$743ᐅ, "ᝍ$743ᐅ");
          function ᝍnote$escapedLfᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$744ᐅ() && ᝍ$747ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍnote$escapedLfᐅ, "ᝍnote$escapedLfᐅ");
          function ᝍ$744ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 110)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$744ᐅ, "ᝍ$744ᐅ");
          function ᝍ$747ᐅ() {
            OUT[OPOS++] = 10;
            return true;
          }
          __name(ᝍ$747ᐅ, "ᝍ$747ᐅ");
          function ᝍnote$nonNewlineCharᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$748ᐅ() && ᝍ$754ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍnote$nonNewlineCharᐅ, "ᝍnote$nonNewlineCharᐅ");
          function ᝍ$748ᐅ() {
            return ᝍ$749ᐅ();
          }
          __name(ᝍ$748ᐅ, "ᝍ$748ᐅ");
          function ᝍ$749ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$750ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$749ᐅ, "ᝍ$749ᐅ");
          function ᝍ$750ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 13 && b !== 10)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$750ᐅ, "ᝍ$750ᐅ");
          function ᝍ$754ᐅ() {
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            OUT[OPOS++] = cp;
            if (cp >= 55296)
              isFastString = false;
            return true;
          }
          __name(ᝍ$754ᐅ, "ᝍ$754ᐅ");
          function ᝍnote$noCommentᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$755ᐅ() && ᝍ$756ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍnote$noCommentᐅ, "ᝍnote$noCommentᐅ");
          function ᝍ$755ᐅ() {
            return ᝍHSᐅ() || true;
          }
          __name(ᝍ$755ᐅ, "ᝍ$755ᐅ");
          function ᝍ$756ᐅ() {
            return true;
          }
          __name(ᝍ$756ᐅ, "ᝍ$756ᐅ");
          function ᝍnumᐅ() {
            return ᝍ$757ᐅ() || ᝍ$762ᐅ();
          }
          __name(ᝍnumᐅ, "ᝍnumᐅ");
          function ᝍ$757ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$758ᐅ() && ᝍ$761ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$757ᐅ, "ᝍ$757ᐅ");
          function ᝍ$758ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 48)
              return false;
            if (IN[IPOS + 1] !== 120)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$758ᐅ, "ᝍ$758ᐅ");
          var ᝍ$761ᐅ = createUtf8IntParser({ base: 16, signed: false });
          var ᝍ$762ᐅ = parseUtf8Float;
          function ᝍintDecᐅ() {
            return ᝍ$763ᐅ();
          }
          __name(ᝍintDecᐅ, "ᝍintDecᐅ");
          function ᝍ$763ᐅ() {
            return ᝍ$764ᐅ() || ᝍ$769ᐅ();
          }
          __name(ᝍ$763ᐅ, "ᝍ$763ᐅ");
          function ᝍ$764ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$765ᐅ() && ᝍ$768ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$764ᐅ, "ᝍ$764ᐅ");
          function ᝍ$765ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 48)
              return false;
            if (IN[IPOS + 1] !== 120)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$765ᐅ, "ᝍ$765ᐅ");
          var ᝍ$768ᐅ = createUtf8IntParser({ base: 16, signed: false });
          var ᝍ$769ᐅ = createUtf8IntParser({ base: 10, signed: true });
          function ᝍintHexᐅ() {
            return ᝍ$771ᐅ() || ᝍ$776ᐅ();
          }
          __name(ᝍintHexᐅ, "ᝍintHexᐅ");
          function ᝍ$771ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$772ᐅ() && ᝍ$775ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$771ᐅ, "ᝍ$771ᐅ");
          function ᝍ$772ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 48)
              return false;
            if (IN[IPOS + 1] !== 120)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$772ᐅ, "ᝍ$772ᐅ");
          var ᝍ$775ᐅ = createUtf8IntParser({ base: 16, signed: false });
          var ᝍ$776ᐅ = createUtf8IntParser({ base: 10, signed: true });
          function ᝍstrᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$777ᐅ() && ᝍ$778ᐅ() && ᝍ$781ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍstrᐅ, "ᝍstrᐅ");
          function ᝍ$777ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 39)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$777ᐅ, "ᝍ$777ᐅ");
          function ᝍ$778ᐅ() {
            return ᝍ$779ᐅ() || ᝍ$780ᐅ();
          }
          __name(ᝍ$778ᐅ, "ᝍ$778ᐅ");
          function ᝍ$779ᐅ() {
            if (!ᝍstrItemᐅ())
              return false;
            while (true) {
              if (!ᝍstrItemᐅ())
                return true;
            }
          }
          __name(ᝍ$779ᐅ, "ᝍ$779ᐅ");
          function ᝍ$780ᐅ() {
            return true;
          }
          __name(ᝍ$780ᐅ, "ᝍ$780ᐅ");
          function ᝍ$781ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 39)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$781ᐅ, "ᝍ$781ᐅ");
          function ᝍstrItemᐅ() {
            return ᝍ$782ᐅ() || ᝍ$789ᐅ() || ᝍ$794ᐅ() || ᝍ$799ᐅ() || ᝍ$804ᐅ() || ᝍ$809ᐅ() || ᝍ$814ᐅ() || ᝍ$819ᐅ() || ᝍ$824ᐅ() || ᝍ$829ᐅ();
          }
          __name(ᝍstrItemᐅ, "ᝍstrItemᐅ");
          function ᝍ$782ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$783ᐅ() && ᝍ$788ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$782ᐅ, "ᝍ$782ᐅ");
          function ᝍ$783ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$784ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$783ᐅ, "ᝍ$783ᐅ");
          function ᝍ$784ᐅ() {
            var IPOSₒ = IPOS;
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            if (cp > 31 && cp !== 92 && cp !== 39)
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = cp;
            return true;
          }
          __name(ᝍ$784ᐅ, "ᝍ$784ᐅ");
          function ᝍ$788ᐅ() {
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            OUT[OPOS++] = cp;
            if (cp >= 55296)
              isFastString = false;
            return true;
          }
          __name(ᝍ$788ᐅ, "ᝍ$788ᐅ");
          function ᝍ$789ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$790ᐅ() && ᝍ$793ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$789ᐅ, "ᝍ$789ᐅ");
          function ᝍ$790ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 98)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$790ᐅ, "ᝍ$790ᐅ");
          function ᝍ$793ᐅ() {
            OUT[OPOS++] = 8;
            return true;
          }
          __name(ᝍ$793ᐅ, "ᝍ$793ᐅ");
          function ᝍ$794ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$795ᐅ() && ᝍ$798ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$794ᐅ, "ᝍ$794ᐅ");
          function ᝍ$795ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 102)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$795ᐅ, "ᝍ$795ᐅ");
          function ᝍ$798ᐅ() {
            OUT[OPOS++] = 12;
            return true;
          }
          __name(ᝍ$798ᐅ, "ᝍ$798ᐅ");
          function ᝍ$799ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$800ᐅ() && ᝍ$803ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$799ᐅ, "ᝍ$799ᐅ");
          function ᝍ$800ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 110)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$800ᐅ, "ᝍ$800ᐅ");
          function ᝍ$803ᐅ() {
            OUT[OPOS++] = 10;
            return true;
          }
          __name(ᝍ$803ᐅ, "ᝍ$803ᐅ");
          function ᝍ$804ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$805ᐅ() && ᝍ$808ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$804ᐅ, "ᝍ$804ᐅ");
          function ᝍ$805ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 114)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$805ᐅ, "ᝍ$805ᐅ");
          function ᝍ$808ᐅ() {
            OUT[OPOS++] = 13;
            return true;
          }
          __name(ᝍ$808ᐅ, "ᝍ$808ᐅ");
          function ᝍ$809ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$810ᐅ() && ᝍ$813ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$809ᐅ, "ᝍ$809ᐅ");
          function ᝍ$810ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 116)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$810ᐅ, "ᝍ$810ᐅ");
          function ᝍ$813ᐅ() {
            OUT[OPOS++] = 9;
            return true;
          }
          __name(ᝍ$813ᐅ, "ᝍ$813ᐅ");
          function ᝍ$814ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$815ᐅ() && ᝍ$818ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$814ᐅ, "ᝍ$814ᐅ");
          function ᝍ$815ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 118)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$815ᐅ, "ᝍ$815ᐅ");
          function ᝍ$818ᐅ() {
            OUT[OPOS++] = 11;
            return true;
          }
          __name(ᝍ$818ᐅ, "ᝍ$818ᐅ");
          function ᝍ$819ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$820ᐅ() && ᝍ$823ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$819ᐅ, "ᝍ$819ᐅ");
          function ᝍ$820ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 92)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$820ᐅ, "ᝍ$820ᐅ");
          function ᝍ$823ᐅ() {
            OUT[OPOS++] = 92;
            return true;
          }
          __name(ᝍ$823ᐅ, "ᝍ$823ᐅ");
          function ᝍ$824ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$825ᐅ() && ᝍ$828ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$824ᐅ, "ᝍ$824ᐅ");
          function ᝍ$825ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 39)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$825ᐅ, "ᝍ$825ᐅ");
          function ᝍ$828ᐅ() {
            OUT[OPOS++] = 39;
            return true;
          }
          __name(ᝍ$828ᐅ, "ᝍ$828ᐅ");
          function ᝍ$829ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$830ᐅ() && ᝍ$833ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$829ᐅ, "ᝍ$829ᐅ");
          function ᝍ$830ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 92)
              return false;
            if (IN[IPOS + 1] !== 34)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$830ᐅ, "ᝍ$830ᐅ");
          function ᝍ$833ᐅ() {
            OUT[OPOS++] = 34;
            return true;
          }
          __name(ᝍ$833ᐅ, "ᝍ$833ᐅ");
          function ᝍboolᐅ() {
            return ᝍ$834ᐅ() || ᝍ$850ᐅ();
          }
          __name(ᝍboolᐅ, "ᝍboolᐅ");
          function ᝍ$834ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$835ᐅ() && ᝍ$840ᐅ() && ᝍ$849ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$834ᐅ, "ᝍ$834ᐅ");
          function ᝍ$835ᐅ() {
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
          __name(ᝍ$835ᐅ, "ᝍ$835ᐅ");
          function ᝍ$840ᐅ() {
            return ᝍ$841ᐅ();
          }
          __name(ᝍ$840ᐅ, "ᝍ$840ᐅ");
          function ᝍ$841ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$842ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$841ᐅ, "ᝍ$841ᐅ");
          function ᝍ$842ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if ((b < 97 || b > 122) && (b < 65 || b > 90) && b !== 95 && b !== 36 && (b < 48 || b > 57))
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$842ᐅ, "ᝍ$842ᐅ");
          function ᝍ$849ᐅ() {
            OUT[OPOS++] = true;
            return true;
          }
          __name(ᝍ$849ᐅ, "ᝍ$849ᐅ");
          function ᝍ$850ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$851ᐅ() && ᝍ$857ᐅ() && ᝍ$866ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$850ᐅ, "ᝍ$850ᐅ");
          function ᝍ$851ᐅ() {
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
          __name(ᝍ$851ᐅ, "ᝍ$851ᐅ");
          function ᝍ$857ᐅ() {
            return ᝍ$858ᐅ();
          }
          __name(ᝍ$857ᐅ, "ᝍ$857ᐅ");
          function ᝍ$858ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$859ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$858ᐅ, "ᝍ$858ᐅ");
          function ᝍ$859ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if ((b < 97 || b > 122) && (b < 65 || b > 90) && b !== 95 && b !== 36 && (b < 48 || b > 57))
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$859ᐅ, "ᝍ$859ᐅ");
          function ᝍ$866ᐅ() {
            OUT[OPOS++] = false;
            return true;
          }
          __name(ᝍ$866ᐅ, "ᝍ$866ᐅ");
          function ᝍnull_ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$867ᐅ() && ᝍ$872ᐅ() && ᝍ$881ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍnull_ᐅ, "ᝍnull_ᐅ");
          function ᝍ$867ᐅ() {
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
          __name(ᝍ$867ᐅ, "ᝍ$867ᐅ");
          function ᝍ$872ᐅ() {
            return ᝍ$873ᐅ();
          }
          __name(ᝍ$872ᐅ, "ᝍ$872ᐅ");
          function ᝍ$873ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$874ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$873ᐅ, "ᝍ$873ᐅ");
          function ᝍ$874ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if ((b < 97 || b > 122) && (b < 65 || b > 90) && b !== 95 && b !== 36 && (b < 48 || b > 57))
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$874ᐅ, "ᝍ$874ᐅ");
          function ᝍ$881ᐅ() {
            OUT[OPOS++] = null;
            return true;
          }
          __name(ᝍ$881ᐅ, "ᝍ$881ᐅ");
          function ᝍrefᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$882ᐅ() && ᝍ$889ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍrefᐅ, "ᝍrefᐅ");
          function ᝍ$882ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "kind";
            if (!ᝍ$884ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$882ᐅ, "ᝍ$882ᐅ");
          function ᝍ$884ᐅ() {
            return parseString(ᝍ$885ᐅ);
          }
          __name(ᝍ$884ᐅ, "ᝍ$884ᐅ");
          function ᝍ$885ᐅ() {
            OUT[OPOS++] = 82;
            OUT[OPOS++] = 101;
            OUT[OPOS++] = 102;
            return true;
          }
          __name(ᝍ$885ᐅ, "ᝍ$885ᐅ");
          function ᝍ$889ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            OUT[OPOS++] = "name";
            if (!ᝍ$891ᐅ())
              return IPOS = IPOSₒ, OPOS = OPOSₒ, false;
            return true;
          }
          __name(ᝍ$889ᐅ, "ᝍ$889ᐅ");
          function ᝍ$891ᐅ() {
            return parseString(ᝍidᐅ);
          }
          __name(ᝍ$891ᐅ, "ᝍ$891ᐅ");
          function ᝍidᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$892ᐅ() && ᝍ$897ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍidᐅ, "ᝍidᐅ");
          function ᝍ$892ᐅ() {
            var IPOSₒ = IPOS;
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36)
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = cp;
            return true;
          }
          __name(ᝍ$892ᐅ, "ᝍ$892ᐅ");
          function ᝍ$897ᐅ() {
            while (ᝍ$898ᐅ())
              ;
            return true;
          }
          __name(ᝍ$897ᐅ, "ᝍ$897ᐅ");
          function ᝍ$898ᐅ() {
            var IPOSₒ = IPOS;
            var cp = readUtf8Codepoint();
            if (cp === -1)
              return false;
            if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
              return IPOS = IPOSₒ, false;
            OUT[OPOS++] = cp;
            return true;
          }
          __name(ᝍ$898ᐅ, "ᝍ$898ᐅ");
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
          function ᝍLBᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 91)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍLBᐅ, "ᝍLBᐅ");
          function ᝍRBᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 93)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍRBᐅ, "ᝍRBᐅ");
          function ᝍWSᐅ() {
            if (!ᝍ$906ᐅ())
              return false;
            while (true) {
              if (!ᝍ$906ᐅ())
                return true;
            }
          }
          __name(ᝍWSᐅ, "ᝍWSᐅ");
          function ᝍ$906ᐅ() {
            return ᝍHSᐅ() || ᝍCOMMENTᐅ() || ᝍEOLᐅ();
          }
          __name(ᝍ$906ᐅ, "ᝍ$906ᐅ");
          function ᝍHSᐅ() {
            if (!ᝍ$907ᐅ())
              return false;
            while (true) {
              if (!ᝍ$907ᐅ())
                return true;
            }
          }
          __name(ᝍHSᐅ, "ᝍHSᐅ");
          function ᝍ$907ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 32 && b !== 9)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$907ᐅ, "ᝍ$907ᐅ");
          function ᝍCOMMENTᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$910ᐅ() && ᝍ$911ᐅ() && ᝍ$913ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍCOMMENTᐅ, "ᝍCOMMENTᐅ");
          function ᝍ$910ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 35)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$910ᐅ, "ᝍ$910ᐅ");
          function ᝍ$911ᐅ() {
            return ᝍ$912ᐅ() || true;
          }
          __name(ᝍ$911ᐅ, "ᝍ$911ᐅ");
          function ᝍ$912ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 32)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$912ᐅ, "ᝍ$912ᐅ");
          function ᝍ$913ᐅ() {
            while (ᝍ$914ᐅ())
              ;
            return true;
          }
          __name(ᝍ$913ᐅ, "ᝍ$913ᐅ");
          function ᝍ$914ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᝍ$915ᐅ() && ᝍ$917ᐅ() && ᝍ$919ᐅ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᝍ$914ᐅ, "ᝍ$914ᐅ");
          function ᝍ$915ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$916ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$915ᐅ, "ᝍ$915ᐅ");
          function ᝍ$916ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 13)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$916ᐅ, "ᝍ$916ᐅ");
          function ᝍ$917ᐅ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᝍ$918ᐅ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᝍ$917ᐅ, "ᝍ$917ᐅ");
          function ᝍ$918ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 10)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$918ᐅ, "ᝍ$918ᐅ");
          function ᝍ$919ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            IPOS += 1;
            return true;
          }
          __name(ᝍ$919ᐅ, "ᝍ$919ᐅ");
          function ᝍEOLᐅ() {
            return ᝍ$920ᐅ() || ᝍ$923ᐅ() || ᝍ$924ᐅ();
          }
          __name(ᝍEOLᐅ, "ᝍEOLᐅ");
          function ᝍ$920ᐅ() {
            if (IPOS + 2 > ILEN)
              return false;
            if (IN[IPOS] !== 13)
              return false;
            if (IN[IPOS + 1] !== 10)
              return false;
            IPOS += 2;
            return true;
          }
          __name(ᝍ$920ᐅ, "ᝍ$920ᐅ");
          function ᝍ$923ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 13)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$923ᐅ, "ᝍ$923ᐅ");
          function ᝍ$924ᐅ() {
            if (IPOS >= ILEN)
              return false;
            var b = IN[IPOS];
            if (b !== 10)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᝍ$924ᐅ, "ᝍ$924ᐅ");
          return $parse;
        }(),
        print: function() {
          var __name2 = /* @__PURE__ */ __name((x) => x, "__name");
          var IN;
          var IPOS;
          var ILEN;
          var OUT;
          var OPOS;
          var isFastString = true;
          var stringCodepoints = new Uint32Array(1);
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
            IN = typeof stringOrBytes === "string" ? stringToUtf8Bytes2(stringOrBytes) : stringOrBytes;
            IPOS = 0, ILEN = IN.length, OUT = [], OPOS = 0;
            onReset.forEach((cb) => cb());
            if (!ᝍstartᐅ())
              throw new Error("parse failed");
            if (IPOS !== ILEN)
              throw new Error("parse did not consume entire input");
            if (OPOS !== 1)
              throw new Error("parse did not produce a singular value");
            return OUT[0];
          }
          __name($parse, "$parse");
          __name2($parse, "$parse");
          function $print(value, outputBytes) {
            IN = [value], IPOS = 0, ILEN = 1;
            OUT = outputBytes ?? new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
            onReset.forEach((cb) => cb());
            if (!ᐊstartᝍ2())
              throw new Error("print failed");
            if (OPOS > OUT.length)
              throw new Error("output buffer too small");
            return outputBytes ? OPOS : utf8BytesToString(OUT.subarray(0, OPOS));
          }
          __name($print, "$print");
          __name2($print, "$print");
          function parseString(rule) {
            var OPOSₒ = OPOS;
            isFastString = true;
            if (!rule())
              return false;
            if (isFastString && OPOS - OPOSₒ < 65536) {
              OUT[OPOSₒ] = String.fromCharCode.apply(String, OUT.slice(OPOSₒ, OPOS));
            } else {
              for (var str = "", i = OPOSₒ; i < OPOS; i += 65536) {
                str += String.fromCodePoint.apply(String, OUT.slice(i, Math.min(i + 65536, OPOS)));
              }
              OUT[OPOSₒ] = str;
            }
            OPOS = OPOSₒ + 1;
            return true;
          }
          __name(parseString, "parseString");
          __name2(parseString, "parseString");
          function printString(rule) {
            var value = IN[IPOS];
            if (IPOS >= ILEN || typeof value !== "string")
              return false;
            var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
            var vl = value.length;
            if (stringCodepoints.length < vl)
              stringCodepoints = new Uint32Array(vl);
            IN = stringCodepoints, ILEN = 0, IPOS = 0;
            for (var i = 0; i < vl; ++i) {
              var cp = value.charCodeAt(i);
              if ((cp & 64512) === 55296)
                cp = value.codePointAt(i++);
              IN[ILEN++] = cp;
            }
            var result = rule() && IPOS === ILEN;
            IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
            if (result)
              IPOS += 1;
            return result;
          }
          __name(printString, "printString");
          __name2(printString, "printString");
          function parseList(rule) {
            var OPOSₒ = OPOS;
            if (!rule())
              return false;
            OUT[OPOSₒ] = OUT.slice(OPOSₒ, OPOS);
            OPOS = OPOSₒ + 1;
            return true;
          }
          __name(parseList, "parseList");
          __name2(parseList, "parseList");
          function printList(rule) {
            var value = IN[IPOS];
            if (IPOS >= ILEN || !Array.isArray(value))
              return false;
            var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
            IN = value, IPOS = 0, ILEN = IN.length;
            var result = rule() && IPOS === ILEN;
            IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
            if (result)
              IPOS += 1;
            return result;
          }
          __name(printList, "printList");
          __name2(printList, "printList");
          function parseRecord(rule) {
            var OPOSₒ = OPOS;
            if (!rule())
              return false;
            var obj = {};
            for (var i = OPOSₒ; i < OPOS; i += 2) {
              var label2 = OUT[i];
              $assert(!obj.hasOwnProperty(label2), `Duplicate label '${label2}' in record`);
              obj[label2] = OUT[i + 1];
            }
            OUT[OPOSₒ] = obj;
            OPOS = OPOSₒ + 1;
            return true;
          }
          __name(parseRecord, "parseRecord");
          __name2(parseRecord, "parseRecord");
          function printRecord(rule) {
            var value = IN[IPOS];
            if (IPOS >= ILEN || value === null || typeof value !== "object" || Array.isArray(value))
              return false;
            var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
            IN = [];
            for (var labels = Object.keys(value), i = 0; i < labels.length; ++i) {
              IN.push(labels[i], value[labels[i]]);
            }
            IPOS = 0, ILEN = IN.length;
            var result = rule() && IPOS === ILEN;
            IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
            if (result)
              IPOS += 1;
            return result;
          }
          __name(printRecord, "printRecord");
          __name2(printRecord, "printRecord");
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
            return true;
          }
          __name(parseUtf8Float, "parseUtf8Float");
          __name2(parseUtf8Float, "parseUtf8Float");
          function printUtf8Float() {
            var num = IN[IPOS];
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
              return true;
            }, "parseUtf8Int"), "parseUtf8Int");
          }
          __name(createUtf8IntParser, "createUtf8IntParser");
          __name2(createUtf8IntParser, "createUtf8IntParser");
          function createUtf8IntPrinter({ base, signed }) {
            $assert(typeof base === "number" && base >= 2 && base <= 36);
            $assert(typeof signed === "boolean");
            return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function printUtf8Int() {
              var num = IN[IPOS];
              if (typeof num !== "number")
                return false;
              var isNegative = false;
              var MAX_NUM = 2147483647;
              if (num < 0) {
                if (!signed)
                  return false;
                isNegative = true;
                num = -num;
                MAX_NUM = 2147483648;
              }
              if (num > MAX_NUM)
                return false;
              var digits = [];
              while (true) {
                var d2 = num % base;
                num = num / base | 0;
                digits.push(CHAR_CODES[d2]);
                if (num === 0)
                  break;
              }
              IPOS += 1;
              if (isNegative)
                OUT[OPOS++] = HYPHEN;
              for (var i = digits.length; i > 0; ) {
                OUT[OPOS++] = digits[--i];
              }
              return true;
            }, "printUtf8Int"), "printUtf8Int");
          }
          __name(createUtf8IntPrinter, "createUtf8IntPrinter");
          __name2(createUtf8IntPrinter, "createUtf8IntPrinter");
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
              if (cp >= 55296)
                isFastString = false;
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
              if (IPOS >= ILEN)
                return false;
              var cp = IN[IPOS];
              var s = cp.toString(base).padStart(minlen, "0");
              if (s.length > maxlen)
                return false;
              for (var char of s)
                OUT[OPOS++] = char.charCodeAt(0);
              return true;
            }, "printUtf8Codepoint"), "printUtf8Codepoint");
          }
          __name(createUtf8UecharPrinter, "createUtf8UecharPrinter");
          __name2(createUtf8UecharPrinter, "createUtf8UecharPrinter");
          function createLeftrec(rule) {
            var saved;
            return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function leftrec() {
              if (saved?.IN === IN && saved.IPOS === IPOS) {
                IPOS += saved.ΔIPOS;
                for (var i = 0; i < saved.ΔOUT.length; ++i)
                  OUT[OPOS++] = saved.ΔOUT[i];
                return saved.result;
              }
              var savedₒ = saved, result = false;
              saved = { IN, IPOS, result, ΔIPOS: 0, ΔOUT: [] };
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              while (true) {
                IPOS = IPOSₒ, OPOS = OPOSₒ;
                result = rule();
                var isFirstIteration = !saved.result;
                var isMoreInputConsumedThanPreviousIteration = IPOS - IPOSₒ > saved.ΔIPOS;
                if (result && (isFirstIteration || isMoreInputConsumedThanPreviousIteration)) {
                  saved.result = result;
                  saved.ΔIPOS = IPOS - IPOSₒ;
                  saved.ΔOUT = OUT.slice(OPOSₒ, OPOS);
                  continue;
                }
                IPOS = IPOSₒ, OPOS = OPOSₒ;
                leftrec();
                saved = savedₒ;
                return result;
              }
            }, "leftrec"), "leftrec");
          }
          __name(createLeftrec, "createLeftrec");
          __name2(createLeftrec, "createLeftrec");
          function stringToUtf8Bytes2(s) {
            OUT = new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
            for (var char of s)
              writeUtf8Codepoint(char.codePointAt(0));
            if (OPOS > OUT.length)
              throw new Error("input buffer too small");
            return OUT.subarray(0, OPOS);
          }
          __name(stringToUtf8Bytes2, "stringToUtf8Bytes2");
          __name2(stringToUtf8Bytes2, "stringToUtf8Bytes");
          function utf8BytesToString(b) {
            IN = b, IPOS = 0, ILEN = b.length;
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
          __name(utf8BytesToString, "utf8BytesToString");
          __name2(utf8BytesToString, "utf8BytesToString");
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
          function ᐊstartᝍ2() {
            return printRecord(ᐊstart1ᝍ);
          }
          __name(ᐊstartᝍ2, "ᐊstartᝍ");
          function ᐊstart1ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$1ᝍ() && ᐊ$2ᝍ() && ᐊ$6ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊstart1ᝍ, "ᐊstart1ᝍ");
          function ᐊ$1ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊWSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$1ᝍ, "ᐊ$1ᝍ");
          function ᐊ$2ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$3ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$2ᝍ, "ᐊ$2ᝍ");
          function ᐊ$3ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "rules" && ᐊ$5ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$3ᝍ, "ᐊ$3ᝍ");
          function ᐊ$5ᝍ() {
            return printRecord(ᐊlinesᝍ);
          }
          __name(ᐊ$5ᝍ, "ᐊ$5ᝍ");
          function ᐊ$6ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊWSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$6ᝍ, "ᐊ$6ᝍ");
          function ᐊlinesᝍ() {
            return ᐊ$7ᝍ() || ᐊ$11ᝍ();
          }
          __name(ᐊlinesᝍ, "ᐊlinesᝍ");
          function ᐊ$7ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊlineᝍ() && ᐊ$8ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$7ᝍ, "ᐊ$7ᝍ");
          function ᐊ$8ᝍ() {
            while (ᐊ$9ᝍ())
              ;
            return true;
          }
          __name(ᐊ$8ᝍ, "ᐊ$8ᝍ");
          function ᐊ$9ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$10ᝍ() && ᐊlineᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$9ᝍ, "ᐊ$9ᝍ");
          function ᐊ$10ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊWSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$10ᝍ, "ᐊ$10ᝍ");
          function ᐊ$11ᝍ() {
            return true;
          }
          __name(ᐊ$11ᝍ, "ᐊ$11ᝍ");
          function ᐊlineᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$12ᝍ() && ᐊEOLᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊlineᝍ, "ᐊlineᝍ");
          function ᐊ$12ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$13ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$12ᝍ, "ᐊ$12ᝍ");
          function ᐊ$13ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (ᐊ$14ᝍ() && ᐊ$21ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$13ᝍ, "ᐊ$13ᝍ");
          function ᐊ$14ᝍ() {
            return printString(ᐊ$15ᝍ);
          }
          __name(ᐊ$14ᝍ, "ᐊ$14ᝍ");
          function ᐊ$15ᝍ() {
            return ᐊ$16ᝍ();
          }
          __name(ᐊ$15ᝍ, "ᐊ$15ᝍ");
          function ᐊ$16ᝍ() {
            return ᐊ$17ᝍ() || ᐊ$20ᝍ();
          }
          __name(ᐊ$16ᝍ, "ᐊ$16ᝍ");
          function ᐊ$17ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$18ᝍ() && ᐊidᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$17ᝍ, "ᐊ$17ᝍ");
          function ᐊ$18ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = ᐊ$19ᝍ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᐊ$18ᝍ, "ᐊ$18ᝍ");
          function ᐊ$19ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 36)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$19ᝍ, "ᐊ$19ᝍ");
          function ᐊ$20ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊEOLᝍ() && ᐊidᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$20ᝍ, "ᐊ$20ᝍ");
          function ᐊ$21ᝍ() {
            return printRecord(ᐊ$22ᝍ);
          }
          __name(ᐊ$21ᝍ, "ᐊ$21ᝍ");
          function ᐊ$22ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$23ᝍ() && ᐊruleᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$22ᝍ, "ᐊ$22ᝍ");
          function ᐊ$23ᝍ() {
            return ᐊ$24ᝍ();
          }
          __name(ᐊ$23ᝍ, "ᐊ$23ᝍ");
          function ᐊ$24ᝍ() {
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 32;
            return true;
          }
          __name(ᐊ$24ᝍ, "ᐊ$24ᝍ");
          function ᐊruleᝍ() {
            return ᐊassertionᝍ() || ᐊbyteᝍ() || ᐊchar_ᝍ() || ᐊfieldᝍ() || ᐊdualᝍ() || ᐊiterationᝍ() || ᐊlistᝍ() || ᐊmodᝍ() || ᐊnegationᝍ() || ᐊrecordᝍ() || ᐊscalarᝍ() || ᐊselectionᝍ() || ᐊsequenceᝍ() || ᐊstringᝍ() || ᐊutf8_charᝍ() || ᐊutf8_floatᝍ() || ᐊutf8_intᝍ() || ᐊutf8_uecharᝍ();
          }
          __name(ᐊruleᝍ, "ᐊruleᝍ");
          function ᐊassertionᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$29ᝍ() && ᐊ$42ᝍ() && ᐊ$48ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊassertionᝍ, "ᐊassertionᝍ");
          function ᐊ$29ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$31ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$29ᝍ, "ᐊ$29ᝍ");
          function ᐊ$31ᝍ() {
            return printString(ᐊ$32ᝍ);
          }
          __name(ᐊ$31ᝍ, "ᐊ$31ᝍ");
          function ᐊ$32ᝍ() {
            if (IPOS + 9 > ILEN)
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
          __name(ᐊ$32ᝍ, "ᐊ$32ᝍ");
          function ᐊ$42ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$44ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$42ᝍ, "ᐊ$42ᝍ");
          function ᐊ$44ᝍ() {
            return printList(ᐊ$45ᝍ);
          }
          __name(ᐊ$44ᝍ, "ᐊ$44ᝍ");
          function ᐊ$45ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$46ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$45ᝍ, "ᐊ$45ᝍ");
          function ᐊ$46ᝍ() {
            return printRecord(ᐊ$47ᝍ);
          }
          __name(ᐊ$46ᝍ, "ᐊ$46ᝍ");
          function ᐊ$47ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$47ᝍ, "ᐊ$47ᝍ");
          function ᐊ$48ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$50ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$48ᝍ, "ᐊ$48ᝍ");
          function ᐊ$50ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$50ᝍ, "ᐊ$50ᝍ");
          function ᐊbyteᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$51ᝍ() && ᐊ$59ᝍ() && ᐊ$65ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊbyteᝍ, "ᐊbyteᝍ");
          function ᐊ$51ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$53ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$51ᝍ, "ᐊ$51ᝍ");
          function ᐊ$53ᝍ() {
            return printString(ᐊ$54ᝍ);
          }
          __name(ᐊ$53ᝍ, "ᐊ$53ᝍ");
          function ᐊ$54ᝍ() {
            if (IPOS + 4 > ILEN)
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
          __name(ᐊ$54ᝍ, "ᐊ$54ᝍ");
          function ᐊ$59ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$61ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$59ᝍ, "ᐊ$59ᝍ");
          function ᐊ$61ᝍ() {
            return printList(ᐊ$62ᝍ);
          }
          __name(ᐊ$61ᝍ, "ᐊ$61ᝍ");
          function ᐊ$62ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$63ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$62ᝍ, "ᐊ$62ᝍ");
          function ᐊ$63ᝍ() {
            return printRecord(ᐊ$64ᝍ);
          }
          __name(ᐊ$63ᝍ, "ᐊ$63ᝍ");
          function ᐊ$64ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊbyteRangeᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$64ᝍ, "ᐊ$64ᝍ");
          function ᐊ$65ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$67ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$65ᝍ, "ᐊ$65ᝍ");
          function ᐊ$67ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$67ᝍ, "ᐊ$67ᝍ");
          function ᐊchar_ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$68ᝍ() && ᐊ$76ᝍ() && ᐊ$82ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊchar_ᝍ, "ᐊchar_ᝍ");
          function ᐊ$68ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$70ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$68ᝍ, "ᐊ$68ᝍ");
          function ᐊ$70ᝍ() {
            return printString(ᐊ$71ᝍ);
          }
          __name(ᐊ$70ᝍ, "ᐊ$70ᝍ");
          function ᐊ$71ᝍ() {
            if (IPOS + 4 > ILEN)
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
          __name(ᐊ$71ᝍ, "ᐊ$71ᝍ");
          function ᐊ$76ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$78ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$76ᝍ, "ᐊ$76ᝍ");
          function ᐊ$78ᝍ() {
            return printList(ᐊ$79ᝍ);
          }
          __name(ᐊ$78ᝍ, "ᐊ$78ᝍ");
          function ᐊ$79ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$80ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$79ᝍ, "ᐊ$79ᝍ");
          function ᐊ$80ᝍ() {
            return printRecord(ᐊ$81ᝍ);
          }
          __name(ᐊ$80ᝍ, "ᐊ$80ᝍ");
          function ᐊ$81ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊcharRangeᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$81ᝍ, "ᐊ$81ᝍ");
          function ᐊ$82ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$84ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$82ᝍ, "ᐊ$82ᝍ");
          function ᐊ$84ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$84ᝍ, "ᐊ$84ᝍ");
          function ᐊdualᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$85ᝍ() && ᐊ$93ᝍ() && ᐊ$101ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊdualᝍ, "ᐊdualᝍ");
          function ᐊ$85ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$87ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$85ᝍ, "ᐊ$85ᝍ");
          function ᐊ$87ᝍ() {
            return printString(ᐊ$88ᝍ);
          }
          __name(ᐊ$87ᝍ, "ᐊ$87ᝍ");
          function ᐊ$88ᝍ() {
            if (IPOS + 4 > ILEN)
              return false;
            if (IN[IPOS] !== 100)
              return false;
            if (IN[IPOS + 1] !== 117)
              return false;
            if (IN[IPOS + 2] !== 97)
              return false;
            if (IN[IPOS + 3] !== 108)
              return false;
            IPOS += 4;
            OUT[OPOS++] = 100;
            OUT[OPOS++] = 117;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 108;
            return true;
          }
          __name(ᐊ$88ᝍ, "ᐊ$88ᝍ");
          function ᐊ$93ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$95ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$93ᝍ, "ᐊ$93ᝍ");
          function ᐊ$95ᝍ() {
            return printList(ᐊ$96ᝍ);
          }
          __name(ᐊ$95ᝍ, "ᐊ$95ᝍ");
          function ᐊ$96ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$97ᝍ() && ᐊ$99ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$96ᝍ, "ᐊ$96ᝍ");
          function ᐊ$97ᝍ() {
            return printRecord(ᐊ$98ᝍ);
          }
          __name(ᐊ$97ᝍ, "ᐊ$97ᝍ");
          function ᐊ$98ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$98ᝍ, "ᐊ$98ᝍ");
          function ᐊ$99ᝍ() {
            return printRecord(ᐊ$100ᝍ);
          }
          __name(ᐊ$99ᝍ, "ᐊ$99ᝍ");
          function ᐊ$100ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$100ᝍ, "ᐊ$100ᝍ");
          function ᐊ$101ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$103ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$101ᝍ, "ᐊ$101ᝍ");
          function ᐊ$103ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$103ᝍ, "ᐊ$103ᝍ");
          function ᐊfieldᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$104ᝍ() && ᐊ$113ᝍ() && ᐊ$121ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊfieldᝍ, "ᐊfieldᝍ");
          function ᐊ$104ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$106ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$104ᝍ, "ᐊ$104ᝍ");
          function ᐊ$106ᝍ() {
            return printString(ᐊ$107ᝍ);
          }
          __name(ᐊ$106ᝍ, "ᐊ$106ᝍ");
          function ᐊ$107ᝍ() {
            if (IPOS + 5 > ILEN)
              return false;
            if (IN[IPOS] !== 102)
              return false;
            if (IN[IPOS + 1] !== 105)
              return false;
            if (IN[IPOS + 2] !== 101)
              return false;
            if (IN[IPOS + 3] !== 108)
              return false;
            if (IN[IPOS + 4] !== 100)
              return false;
            IPOS += 5;
            OUT[OPOS++] = 102;
            OUT[OPOS++] = 105;
            OUT[OPOS++] = 101;
            OUT[OPOS++] = 108;
            OUT[OPOS++] = 100;
            return true;
          }
          __name(ᐊ$107ᝍ, "ᐊ$107ᝍ");
          function ᐊ$113ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$115ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$113ᝍ, "ᐊ$113ᝍ");
          function ᐊ$115ᝍ() {
            return printList(ᐊ$116ᝍ);
          }
          __name(ᐊ$115ᝍ, "ᐊ$115ᝍ");
          function ᐊ$116ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$117ᝍ() && ᐊ$119ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$116ᝍ, "ᐊ$116ᝍ");
          function ᐊ$117ᝍ() {
            return printRecord(ᐊ$118ᝍ);
          }
          __name(ᐊ$117ᝍ, "ᐊ$117ᝍ");
          function ᐊ$118ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$118ᝍ, "ᐊ$118ᝍ");
          function ᐊ$119ᝍ() {
            return printRecord(ᐊ$120ᝍ);
          }
          __name(ᐊ$119ᝍ, "ᐊ$119ᝍ");
          function ᐊ$120ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$120ᝍ, "ᐊ$120ᝍ");
          function ᐊ$121ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$123ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$121ᝍ, "ᐊ$121ᝍ");
          function ᐊ$123ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$123ᝍ, "ᐊ$123ᝍ");
          function ᐊiterationᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$124ᝍ() && ᐊ$137ᝍ() && ᐊ$145ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊiterationᝍ, "ᐊiterationᝍ");
          function ᐊ$124ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$126ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$124ᝍ, "ᐊ$124ᝍ");
          function ᐊ$126ᝍ() {
            return printString(ᐊ$127ᝍ);
          }
          __name(ᐊ$126ᝍ, "ᐊ$126ᝍ");
          function ᐊ$127ᝍ() {
            if (IPOS + 9 > ILEN)
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
          __name(ᐊ$127ᝍ, "ᐊ$127ᝍ");
          function ᐊ$137ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$139ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$137ᝍ, "ᐊ$137ᝍ");
          function ᐊ$139ᝍ() {
            return printList(ᐊ$140ᝍ);
          }
          __name(ᐊ$139ᝍ, "ᐊ$139ᝍ");
          function ᐊ$140ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$141ᝍ() && ᐊ$143ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$140ᝍ, "ᐊ$140ᝍ");
          function ᐊ$141ᝍ() {
            return printRecord(ᐊ$142ᝍ);
          }
          __name(ᐊ$141ᝍ, "ᐊ$141ᝍ");
          function ᐊ$142ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊiterationRangeᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$142ᝍ, "ᐊ$142ᝍ");
          function ᐊ$143ᝍ() {
            return printRecord(ᐊ$144ᝍ);
          }
          __name(ᐊ$143ᝍ, "ᐊ$143ᝍ");
          function ᐊ$144ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$144ᝍ, "ᐊ$144ᝍ");
          function ᐊ$145ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$147ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$145ᝍ, "ᐊ$145ᝍ");
          function ᐊ$147ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$147ᝍ, "ᐊ$147ᝍ");
          function ᐊlistᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$148ᝍ() && ᐊ$156ᝍ() && ᐊ$162ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊlistᝍ, "ᐊlistᝍ");
          function ᐊ$148ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$150ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$148ᝍ, "ᐊ$148ᝍ");
          function ᐊ$150ᝍ() {
            return printString(ᐊ$151ᝍ);
          }
          __name(ᐊ$150ᝍ, "ᐊ$150ᝍ");
          function ᐊ$151ᝍ() {
            if (IPOS + 4 > ILEN)
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
          __name(ᐊ$151ᝍ, "ᐊ$151ᝍ");
          function ᐊ$156ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$158ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$156ᝍ, "ᐊ$156ᝍ");
          function ᐊ$158ᝍ() {
            return printList(ᐊ$159ᝍ);
          }
          __name(ᐊ$158ᝍ, "ᐊ$158ᝍ");
          function ᐊ$159ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$160ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$159ᝍ, "ᐊ$159ᝍ");
          function ᐊ$160ᝍ() {
            return printRecord(ᐊ$161ᝍ);
          }
          __name(ᐊ$160ᝍ, "ᐊ$160ᝍ");
          function ᐊ$161ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$161ᝍ, "ᐊ$161ᝍ");
          function ᐊ$162ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$164ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$162ᝍ, "ᐊ$162ᝍ");
          function ᐊ$164ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$164ᝍ, "ᐊ$164ᝍ");
          function ᐊmodᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$165ᝍ() && ᐊ$172ᝍ() && ᐊ$204ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊmodᝍ, "ᐊmodᝍ");
          function ᐊ$165ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$167ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$165ᝍ, "ᐊ$165ᝍ");
          function ᐊ$167ᝍ() {
            return printString(ᐊ$168ᝍ);
          }
          __name(ᐊ$167ᝍ, "ᐊ$167ᝍ");
          function ᐊ$168ᝍ() {
            if (IPOS + 3 > ILEN)
              return false;
            if (IN[IPOS] !== 109)
              return false;
            if (IN[IPOS + 1] !== 111)
              return false;
            if (IN[IPOS + 2] !== 100)
              return false;
            IPOS += 3;
            return true;
          }
          __name(ᐊ$168ᝍ, "ᐊ$168ᝍ");
          function ᐊ$172ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$174ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$172ᝍ, "ᐊ$172ᝍ");
          function ᐊ$174ᝍ() {
            return printList(ᐊ$175ᝍ);
          }
          __name(ᐊ$174ᝍ, "ᐊ$174ᝍ");
          function ᐊ$175ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$176ᝍ() && ᐊ$199ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$175ᝍ, "ᐊ$175ᝍ");
          function ᐊ$176ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$177ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$176ᝍ, "ᐊ$176ᝍ");
          function ᐊ$177ᝍ() {
            return printRecord(ᐊ$178ᝍ);
          }
          __name(ᐊ$177ᝍ, "ᐊ$177ᝍ");
          function ᐊ$178ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊLBᝍ() && ᐊ$179ᝍ() && ᐊRBᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$178ᝍ, "ᐊ$178ᝍ");
          function ᐊ$179ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$180ᝍ() && ᐊ$189ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$179ᝍ, "ᐊ$179ᝍ");
          function ᐊ$180ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$182ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$180ᝍ, "ᐊ$180ᝍ");
          function ᐊ$182ᝍ() {
            return printString(ᐊ$183ᝍ);
          }
          __name(ᐊ$182ᝍ, "ᐊ$182ᝍ");
          function ᐊ$183ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$183ᝍ, "ᐊ$183ᝍ");
          function ᐊ$189ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "value" && ᐊ$191ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$189ᝍ, "ᐊ$189ᝍ");
          function ᐊ$191ᝍ() {
            return printString(ᐊ$192ᝍ);
          }
          __name(ᐊ$191ᝍ, "ᐊ$191ᝍ");
          function ᐊ$192ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$193ᝍ() && ᐊ$194ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$192ᝍ, "ᐊ$192ᝍ");
          function ᐊ$193ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp < 97 || cp > 122)
              return false;
            IPOS += 1;
            OUT[OPOS++] = cp;
            return true;
          }
          __name(ᐊ$193ᝍ, "ᐊ$193ᝍ");
          function ᐊ$194ᝍ() {
            while (ᐊ$195ᝍ())
              ;
            return true;
          }
          __name(ᐊ$194ᝍ, "ᐊ$194ᝍ");
          function ᐊ$195ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if ((cp < 97 || cp > 122) && cp !== 46 && (cp < 48 || cp > 57))
              return false;
            OUT[OPOS++] = cp;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$195ᝍ, "ᐊ$195ᝍ");
          function ᐊ$199ᝍ() {
            while (ᐊ$200ᝍ())
              ;
            return true;
          }
          __name(ᐊ$199ᝍ, "ᐊ$199ᝍ");
          function ᐊ$200ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$201ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$200ᝍ, "ᐊ$200ᝍ");
          function ᐊ$201ᝍ() {
            return printRecord(ᐊ$202ᝍ);
          }
          __name(ᐊ$201ᝍ, "ᐊ$201ᝍ");
          function ᐊ$202ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊ$203ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$202ᝍ, "ᐊ$202ᝍ");
          function ᐊ$203ᝍ() {
            return ᐊrefᝍ() || ᐊconstᝍ();
          }
          __name(ᐊ$203ᝍ, "ᐊ$203ᝍ");
          function ᐊ$204ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$206ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$204ᝍ, "ᐊ$204ᝍ");
          function ᐊ$206ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$206ᝍ, "ᐊ$206ᝍ");
          function ᐊnegationᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$207ᝍ() && ᐊ$219ᝍ() && ᐊ$225ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊnegationᝍ, "ᐊnegationᝍ");
          function ᐊ$207ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$209ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$207ᝍ, "ᐊ$207ᝍ");
          function ᐊ$209ᝍ() {
            return printString(ᐊ$210ᝍ);
          }
          __name(ᐊ$209ᝍ, "ᐊ$209ᝍ");
          function ᐊ$210ᝍ() {
            if (IPOS + 8 > ILEN)
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
          __name(ᐊ$210ᝍ, "ᐊ$210ᝍ");
          function ᐊ$219ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$221ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$219ᝍ, "ᐊ$219ᝍ");
          function ᐊ$221ᝍ() {
            return printList(ᐊ$222ᝍ);
          }
          __name(ᐊ$221ᝍ, "ᐊ$221ᝍ");
          function ᐊ$222ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$223ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$222ᝍ, "ᐊ$222ᝍ");
          function ᐊ$223ᝍ() {
            return printRecord(ᐊ$224ᝍ);
          }
          __name(ᐊ$223ᝍ, "ᐊ$223ᝍ");
          function ᐊ$224ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$224ᝍ, "ᐊ$224ᝍ");
          function ᐊ$225ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$227ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$225ᝍ, "ᐊ$225ᝍ");
          function ᐊ$227ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$227ᝍ, "ᐊ$227ᝍ");
          function ᐊrecordᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$228ᝍ() && ᐊ$238ᝍ() && ᐊ$244ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊrecordᝍ, "ᐊrecordᝍ");
          function ᐊ$228ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$230ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$228ᝍ, "ᐊ$228ᝍ");
          function ᐊ$230ᝍ() {
            return printString(ᐊ$231ᝍ);
          }
          __name(ᐊ$230ᝍ, "ᐊ$230ᝍ");
          function ᐊ$231ᝍ() {
            if (IPOS + 6 > ILEN)
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
          __name(ᐊ$231ᝍ, "ᐊ$231ᝍ");
          function ᐊ$238ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$240ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$238ᝍ, "ᐊ$238ᝍ");
          function ᐊ$240ᝍ() {
            return printList(ᐊ$241ᝍ);
          }
          __name(ᐊ$240ᝍ, "ᐊ$240ᝍ");
          function ᐊ$241ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$242ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$241ᝍ, "ᐊ$241ᝍ");
          function ᐊ$242ᝍ() {
            return printRecord(ᐊ$243ᝍ);
          }
          __name(ᐊ$242ᝍ, "ᐊ$242ᝍ");
          function ᐊ$243ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$243ᝍ, "ᐊ$243ᝍ");
          function ᐊ$244ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$246ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$244ᝍ, "ᐊ$244ᝍ");
          function ᐊ$246ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$246ᝍ, "ᐊ$246ᝍ");
          function ᐊscalarᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$247ᝍ() && ᐊ$257ᝍ() && ᐊ$263ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊscalarᝍ, "ᐊscalarᝍ");
          function ᐊ$247ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$249ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$247ᝍ, "ᐊ$247ᝍ");
          function ᐊ$249ᝍ() {
            return printString(ᐊ$250ᝍ);
          }
          __name(ᐊ$249ᝍ, "ᐊ$249ᝍ");
          function ᐊ$250ᝍ() {
            if (IPOS + 6 > ILEN)
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
          __name(ᐊ$250ᝍ, "ᐊ$250ᝍ");
          function ᐊ$257ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$259ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$257ᝍ, "ᐊ$257ᝍ");
          function ᐊ$259ᝍ() {
            return printList(ᐊ$260ᝍ);
          }
          __name(ᐊ$259ᝍ, "ᐊ$259ᝍ");
          function ᐊ$260ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$261ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$260ᝍ, "ᐊ$260ᝍ");
          function ᐊ$261ᝍ() {
            return printRecord(ᐊ$262ᝍ);
          }
          __name(ᐊ$261ᝍ, "ᐊ$261ᝍ");
          function ᐊ$262ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊconstᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$262ᝍ, "ᐊ$262ᝍ");
          function ᐊ$263ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$265ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$263ᝍ, "ᐊ$263ᝍ");
          function ᐊ$265ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$265ᝍ, "ᐊ$265ᝍ");
          function ᐊselectionᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$266ᝍ() && ᐊ$279ᝍ() && ᐊ$288ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊselectionᝍ, "ᐊselectionᝍ");
          function ᐊ$266ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$268ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$266ᝍ, "ᐊ$266ᝍ");
          function ᐊ$268ᝍ() {
            return printString(ᐊ$269ᝍ);
          }
          __name(ᐊ$268ᝍ, "ᐊ$268ᝍ");
          function ᐊ$269ᝍ() {
            if (IPOS + 9 > ILEN)
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
          __name(ᐊ$269ᝍ, "ᐊ$269ᝍ");
          function ᐊ$279ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$281ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$279ᝍ, "ᐊ$279ᝍ");
          function ᐊ$281ᝍ() {
            return printList(ᐊ$282ᝍ);
          }
          __name(ᐊ$281ᝍ, "ᐊ$281ᝍ");
          function ᐊ$282ᝍ() {
            return ᐊ$283ᝍ() || ᐊ$287ᝍ();
          }
          __name(ᐊ$282ᝍ, "ᐊ$282ᝍ");
          function ᐊ$283ᝍ() {
            if (!ᐊ$284ᝍ())
              return false;
            while (true) {
              if (!ᐊ$284ᝍ())
                return true;
            }
          }
          __name(ᐊ$283ᝍ, "ᐊ$283ᝍ");
          function ᐊ$284ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$285ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$284ᝍ, "ᐊ$284ᝍ");
          function ᐊ$285ᝍ() {
            return printRecord(ᐊ$286ᝍ);
          }
          __name(ᐊ$285ᝍ, "ᐊ$285ᝍ");
          function ᐊ$286ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$286ᝍ, "ᐊ$286ᝍ");
          function ᐊ$287ᝍ() {
            return true;
          }
          __name(ᐊ$287ᝍ, "ᐊ$287ᝍ");
          function ᐊ$288ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$290ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$288ᝍ, "ᐊ$288ᝍ");
          function ᐊ$290ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$290ᝍ, "ᐊ$290ᝍ");
          function ᐊsequenceᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$291ᝍ() && ᐊ$303ᝍ() && ᐊ$312ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊsequenceᝍ, "ᐊsequenceᝍ");
          function ᐊ$291ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$293ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$291ᝍ, "ᐊ$291ᝍ");
          function ᐊ$293ᝍ() {
            return printString(ᐊ$294ᝍ);
          }
          __name(ᐊ$293ᝍ, "ᐊ$293ᝍ");
          function ᐊ$294ᝍ() {
            if (IPOS + 8 > ILEN)
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
          __name(ᐊ$294ᝍ, "ᐊ$294ᝍ");
          function ᐊ$303ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$305ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$303ᝍ, "ᐊ$303ᝍ");
          function ᐊ$305ᝍ() {
            return printList(ᐊ$306ᝍ);
          }
          __name(ᐊ$305ᝍ, "ᐊ$305ᝍ");
          function ᐊ$306ᝍ() {
            return ᐊ$307ᝍ() || ᐊ$311ᝍ();
          }
          __name(ᐊ$306ᝍ, "ᐊ$306ᝍ");
          function ᐊ$307ᝍ() {
            if (!ᐊ$308ᝍ())
              return false;
            while (true) {
              if (!ᐊ$308ᝍ())
                return true;
            }
          }
          __name(ᐊ$307ᝍ, "ᐊ$307ᝍ");
          function ᐊ$308ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$309ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$308ᝍ, "ᐊ$308ᝍ");
          function ᐊ$309ᝍ() {
            return printRecord(ᐊ$310ᝍ);
          }
          __name(ᐊ$309ᝍ, "ᐊ$309ᝍ");
          function ᐊ$310ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$310ᝍ, "ᐊ$310ᝍ");
          function ᐊ$311ᝍ() {
            return true;
          }
          __name(ᐊ$311ᝍ, "ᐊ$311ᝍ");
          function ᐊ$312ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$314ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$312ᝍ, "ᐊ$312ᝍ");
          function ᐊ$314ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$314ᝍ, "ᐊ$314ᝍ");
          function ᐊstringᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$315ᝍ() && ᐊ$325ᝍ() && ᐊ$331ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊstringᝍ, "ᐊstringᝍ");
          function ᐊ$315ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$317ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$315ᝍ, "ᐊ$315ᝍ");
          function ᐊ$317ᝍ() {
            return printString(ᐊ$318ᝍ);
          }
          __name(ᐊ$317ᝍ, "ᐊ$317ᝍ");
          function ᐊ$318ᝍ() {
            if (IPOS + 6 > ILEN)
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
          __name(ᐊ$318ᝍ, "ᐊ$318ᝍ");
          function ᐊ$325ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$327ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$325ᝍ, "ᐊ$325ᝍ");
          function ᐊ$327ᝍ() {
            return printList(ᐊ$328ᝍ);
          }
          __name(ᐊ$327ᝍ, "ᐊ$327ᝍ");
          function ᐊ$328ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$329ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$328ᝍ, "ᐊ$328ᝍ");
          function ᐊ$329ᝍ() {
            return printRecord(ᐊ$330ᝍ);
          }
          __name(ᐊ$329ᝍ, "ᐊ$329ᝍ");
          function ᐊ$330ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊrefᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$330ᝍ, "ᐊ$330ᝍ");
          function ᐊ$331ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$333ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$331ᝍ, "ᐊ$331ᝍ");
          function ᐊ$333ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$333ᝍ, "ᐊ$333ᝍ");
          function ᐊutf8_charᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$334ᝍ() && ᐊ$347ᝍ() && ᐊ$353ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊutf8_charᝍ, "ᐊutf8_charᝍ");
          function ᐊ$334ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$336ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$334ᝍ, "ᐊ$334ᝍ");
          function ᐊ$336ᝍ() {
            return printString(ᐊ$337ᝍ);
          }
          __name(ᐊ$336ᝍ, "ᐊ$336ᝍ");
          function ᐊ$337ᝍ() {
            if (IPOS + 9 > ILEN)
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
          __name(ᐊ$337ᝍ, "ᐊ$337ᝍ");
          function ᐊ$347ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$349ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$347ᝍ, "ᐊ$347ᝍ");
          function ᐊ$349ᝍ() {
            return printList(ᐊ$350ᝍ);
          }
          __name(ᐊ$349ᝍ, "ᐊ$349ᝍ");
          function ᐊ$350ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$351ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$350ᝍ, "ᐊ$350ᝍ");
          function ᐊ$351ᝍ() {
            return printRecord(ᐊ$352ᝍ);
          }
          __name(ᐊ$351ᝍ, "ᐊ$351ᝍ");
          function ᐊ$352ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊcharRangeᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$352ᝍ, "ᐊ$352ᝍ");
          function ᐊ$353ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$355ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$353ᝍ, "ᐊ$353ᝍ");
          function ᐊ$355ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$355ᝍ, "ᐊ$355ᝍ");
          function ᐊutf8_floatᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$356ᝍ() && ᐊ$370ᝍ() && ᐊ$374ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊutf8_floatᝍ, "ᐊutf8_floatᝍ");
          function ᐊ$356ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$358ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$356ᝍ, "ᐊ$356ᝍ");
          function ᐊ$358ᝍ() {
            return printString(ᐊ$359ᝍ);
          }
          __name(ᐊ$358ᝍ, "ᐊ$358ᝍ");
          function ᐊ$359ᝍ() {
            if (IPOS + 10 > ILEN)
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
          __name(ᐊ$359ᝍ, "ᐊ$359ᝍ");
          function ᐊ$370ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$372ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$370ᝍ, "ᐊ$370ᝍ");
          function ᐊ$372ᝍ() {
            return printList(ᐊ$373ᝍ);
          }
          __name(ᐊ$372ᝍ, "ᐊ$372ᝍ");
          function ᐊ$373ᝍ() {
            return true;
          }
          __name(ᐊ$373ᝍ, "ᐊ$373ᝍ");
          function ᐊ$374ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$376ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$374ᝍ, "ᐊ$374ᝍ");
          function ᐊ$376ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$376ᝍ, "ᐊ$376ᝍ");
          function ᐊutf8_intᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$377ᝍ() && ᐊ$389ᝍ() && ᐊ$434ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊutf8_intᝍ, "ᐊutf8_intᝍ");
          function ᐊ$377ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$379ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$377ᝍ, "ᐊ$377ᝍ");
          function ᐊ$379ᝍ() {
            return printString(ᐊ$380ᝍ);
          }
          __name(ᐊ$379ᝍ, "ᐊ$379ᝍ");
          function ᐊ$380ᝍ() {
            if (IPOS + 8 > ILEN)
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
          __name(ᐊ$380ᝍ, "ᐊ$380ᝍ");
          function ᐊ$389ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$391ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$389ᝍ, "ᐊ$389ᝍ");
          function ᐊ$391ᝍ() {
            return printList(ᐊ$392ᝍ);
          }
          __name(ᐊ$391ᝍ, "ᐊ$391ᝍ");
          function ᐊ$392ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$393ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$392ᝍ, "ᐊ$392ᝍ");
          function ᐊ$393ᝍ() {
            return printRecord(ᐊ$394ᝍ);
          }
          __name(ᐊ$393ᝍ, "ᐊ$393ᝍ");
          function ᐊ$394ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$395ᝍ() && ᐊ$410ᝍ() && ᐊ$421ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$394ᝍ, "ᐊ$394ᝍ");
          function ᐊ$395ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$397ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$395ᝍ, "ᐊ$395ᝍ");
          function ᐊ$397ᝍ() {
            return printString(ᐊ$398ᝍ);
          }
          __name(ᐊ$397ᝍ, "ᐊ$397ᝍ");
          function ᐊ$398ᝍ() {
            if (IPOS + 11 > ILEN)
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
          __name(ᐊ$398ᝍ, "ᐊ$398ᝍ");
          function ᐊ$410ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (ᐊ$411ᝍ() && ᐊ$418ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$410ᝍ, "ᐊ$410ᝍ");
          function ᐊ$411ᝍ() {
            return printString(ᐊ$412ᝍ);
          }
          __name(ᐊ$411ᝍ, "ᐊ$411ᝍ");
          function ᐊ$412ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊ$413ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$412ᝍ, "ᐊ$412ᝍ");
          function ᐊ$413ᝍ() {
            if (IPOS + 4 > ILEN)
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
          __name(ᐊ$413ᝍ, "ᐊ$413ᝍ");
          function ᐊ$418ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$419ᝍ() && ᐊEQᝍ() && ᐊ$420ᝍ() && ᐊintDecᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$418ᝍ, "ᐊ$418ᝍ");
          function ᐊ$419ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$419ᝍ, "ᐊ$419ᝍ");
          function ᐊ$420ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$420ᝍ, "ᐊ$420ᝍ");
          function ᐊ$421ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (ᐊ$422ᝍ() && ᐊ$431ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$421ᝍ, "ᐊ$421ᝍ");
          function ᐊ$422ᝍ() {
            return printString(ᐊ$423ᝍ);
          }
          __name(ᐊ$422ᝍ, "ᐊ$422ᝍ");
          function ᐊ$423ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊ$424ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$423ᝍ, "ᐊ$423ᝍ");
          function ᐊ$424ᝍ() {
            if (IPOS + 6 > ILEN)
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
          __name(ᐊ$424ᝍ, "ᐊ$424ᝍ");
          function ᐊ$431ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$432ᝍ() && ᐊEQᝍ() && ᐊ$433ᝍ() && ᐊboolᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$431ᝍ, "ᐊ$431ᝍ");
          function ᐊ$432ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$432ᝍ, "ᐊ$432ᝍ");
          function ᐊ$433ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$433ᝍ, "ᐊ$433ᝍ");
          function ᐊ$434ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$436ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$434ᝍ, "ᐊ$434ᝍ");
          function ᐊ$436ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$436ᝍ, "ᐊ$436ᝍ");
          function ᐊutf8_uecharᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$437ᝍ() && ᐊ$452ᝍ() && ᐊ$513ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊutf8_uecharᝍ, "ᐊutf8_uecharᝍ");
          function ᐊ$437ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$439ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$437ᝍ, "ᐊ$437ᝍ");
          function ᐊ$439ᝍ() {
            return printString(ᐊ$440ᝍ);
          }
          __name(ᐊ$439ᝍ, "ᐊ$439ᝍ");
          function ᐊ$440ᝍ() {
            if (IPOS + 11 > ILEN)
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
          __name(ᐊ$440ᝍ, "ᐊ$440ᝍ");
          function ᐊ$452ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "args" && ᐊ$454ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$452ᝍ, "ᐊ$452ᝍ");
          function ᐊ$454ᝍ() {
            return printList(ᐊ$455ᝍ);
          }
          __name(ᐊ$454ᝍ, "ᐊ$454ᝍ");
          function ᐊ$455ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$456ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$455ᝍ, "ᐊ$455ᝍ");
          function ᐊ$456ᝍ() {
            return printRecord(ᐊ$457ᝍ);
          }
          __name(ᐊ$456ᝍ, "ᐊ$456ᝍ");
          function ᐊ$457ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$458ᝍ() && ᐊ$476ᝍ() && ᐊ$487ᝍ() && ᐊ$500ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$457ᝍ, "ᐊ$457ᝍ");
          function ᐊ$458ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$460ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$458ᝍ, "ᐊ$458ᝍ");
          function ᐊ$460ᝍ() {
            return printString(ᐊ$461ᝍ);
          }
          __name(ᐊ$460ᝍ, "ᐊ$460ᝍ");
          function ᐊ$461ᝍ() {
            if (IPOS + 14 > ILEN)
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
          __name(ᐊ$461ᝍ, "ᐊ$461ᝍ");
          function ᐊ$476ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (ᐊ$477ᝍ() && ᐊ$484ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$476ᝍ, "ᐊ$476ᝍ");
          function ᐊ$477ᝍ() {
            return printString(ᐊ$478ᝍ);
          }
          __name(ᐊ$477ᝍ, "ᐊ$477ᝍ");
          function ᐊ$478ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊ$479ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$478ᝍ, "ᐊ$478ᝍ");
          function ᐊ$479ᝍ() {
            if (IPOS + 4 > ILEN)
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
          __name(ᐊ$479ᝍ, "ᐊ$479ᝍ");
          function ᐊ$484ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$485ᝍ() && ᐊEQᝍ() && ᐊ$486ᝍ() && ᐊintDecᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$484ᝍ, "ᐊ$484ᝍ");
          function ᐊ$485ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$485ᝍ, "ᐊ$485ᝍ");
          function ᐊ$486ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$486ᝍ, "ᐊ$486ᝍ");
          function ᐊ$487ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (ᐊ$488ᝍ() && ᐊ$497ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$487ᝍ, "ᐊ$487ᝍ");
          function ᐊ$488ᝍ() {
            return printString(ᐊ$489ᝍ);
          }
          __name(ᐊ$488ᝍ, "ᐊ$488ᝍ");
          function ᐊ$489ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊ$490ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$489ᝍ, "ᐊ$489ᝍ");
          function ᐊ$490ᝍ() {
            if (IPOS + 6 > ILEN)
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
          __name(ᐊ$490ᝍ, "ᐊ$490ᝍ");
          function ᐊ$497ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$498ᝍ() && ᐊEQᝍ() && ᐊ$499ᝍ() && ᐊintDecᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$497ᝍ, "ᐊ$497ᝍ");
          function ᐊ$498ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$498ᝍ, "ᐊ$498ᝍ");
          function ᐊ$499ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$499ᝍ, "ᐊ$499ᝍ");
          function ᐊ$500ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (ᐊ$501ᝍ() && ᐊ$510ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$500ᝍ, "ᐊ$500ᝍ");
          function ᐊ$501ᝍ() {
            return printString(ᐊ$502ᝍ);
          }
          __name(ᐊ$501ᝍ, "ᐊ$501ᝍ");
          function ᐊ$502ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊHSᝍ() && ᐊ$503ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$502ᝍ, "ᐊ$502ᝍ");
          function ᐊ$503ᝍ() {
            if (IPOS + 6 > ILEN)
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
          __name(ᐊ$503ᝍ, "ᐊ$503ᝍ");
          function ᐊ$510ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$511ᝍ() && ᐊEQᝍ() && ᐊ$512ᝍ() && ᐊintDecᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$510ᝍ, "ᐊ$510ᝍ");
          function ᐊ$511ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$511ᝍ, "ᐊ$511ᝍ");
          function ᐊ$512ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$512ᝍ, "ᐊ$512ᝍ");
          function ᐊ$513ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "meta" && ᐊ$515ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$513ᝍ, "ᐊ$513ᝍ");
          function ᐊ$515ᝍ() {
            return printRecord(ᐊmetaᝍ);
          }
          __name(ᐊ$515ᝍ, "ᐊ$515ᝍ");
          function ᐊconstᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$516ᝍ() && ᐊ$525ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊconstᝍ, "ᐊconstᝍ");
          function ᐊ$516ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$518ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$516ᝍ, "ᐊ$516ᝍ");
          function ᐊ$518ᝍ() {
            return printString(ᐊ$519ᝍ);
          }
          __name(ᐊ$518ᝍ, "ᐊ$518ᝍ");
          function ᐊ$519ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$519ᝍ, "ᐊ$519ᝍ");
          function ᐊ$525ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "value" && ᐊ$527ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$525ᝍ, "ᐊ$525ᝍ");
          function ᐊ$527ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$528ᝍ() && ᐊ$529ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$527ᝍ, "ᐊ$527ᝍ");
          function ᐊ$528ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$528ᝍ, "ᐊ$528ᝍ");
          function ᐊ$529ᝍ() {
            return ᐊ$530ᝍ() || ᐊnumᝍ() || ᐊboolᝍ() || ᐊnull_ᝍ();
          }
          __name(ᐊ$529ᝍ, "ᐊ$529ᝍ");
          function ᐊ$530ᝍ() {
            return printString(ᐊstrᝍ);
          }
          __name(ᐊ$530ᝍ, "ᐊ$530ᝍ");
          function ᐊbyteRangeᝍ() {
            return ᐊ$531ᝍ() || ᐊ$546ᝍ() || ᐊ$562ᝍ() || ᐊ$578ᝍ();
          }
          __name(ᐊbyteRangeᝍ, "ᐊbyteRangeᝍ");
          function ᐊ$531ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$532ᝍ() && ᐊ$541ᝍ() && ᐊ$543ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$531ᝍ, "ᐊ$531ᝍ");
          function ᐊ$532ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$534ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$532ᝍ, "ᐊ$532ᝍ");
          function ᐊ$534ᝍ() {
            return printString(ᐊ$535ᝍ);
          }
          __name(ᐊ$534ᝍ, "ᐊ$534ᝍ");
          function ᐊ$535ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$535ᝍ, "ᐊ$535ᝍ");
          function ᐊ$541ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊintHexᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$541ᝍ, "ᐊ$541ᝍ");
          function ᐊ$543ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$545ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$543ᝍ, "ᐊ$543ᝍ");
          function ᐊ$545ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊintHexᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$545ᝍ, "ᐊ$545ᝍ");
          function ᐊ$546ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$547ᝍ() && ᐊ$556ᝍ() && ᐊ$558ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$546ᝍ, "ᐊ$546ᝍ");
          function ᐊ$547ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$549ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$547ᝍ, "ᐊ$547ᝍ");
          function ᐊ$549ᝍ() {
            return printString(ᐊ$550ᝍ);
          }
          __name(ᐊ$549ᝍ, "ᐊ$549ᝍ");
          function ᐊ$550ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$550ᝍ, "ᐊ$550ᝍ");
          function ᐊ$556ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊintHexᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$556ᝍ, "ᐊ$556ᝍ");
          function ᐊ$558ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$560ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$558ᝍ, "ᐊ$558ᝍ");
          function ᐊ$560ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊ$561ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$560ᝍ, "ᐊ$560ᝍ");
          function ᐊ$561ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 255)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$561ᝍ, "ᐊ$561ᝍ");
          function ᐊ$562ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$563ᝍ() && ᐊ$572ᝍ() && ᐊ$575ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$562ᝍ, "ᐊ$562ᝍ");
          function ᐊ$563ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$565ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$563ᝍ, "ᐊ$563ᝍ");
          function ᐊ$565ᝍ() {
            return printString(ᐊ$566ᝍ);
          }
          __name(ᐊ$565ᝍ, "ᐊ$565ᝍ");
          function ᐊ$566ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$566ᝍ, "ᐊ$566ᝍ");
          function ᐊ$572ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊ$574ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$572ᝍ, "ᐊ$572ᝍ");
          function ᐊ$574ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 0)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$574ᝍ, "ᐊ$574ᝍ");
          function ᐊ$575ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$577ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$575ᝍ, "ᐊ$575ᝍ");
          function ᐊ$577ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊintHexᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$577ᝍ, "ᐊ$577ᝍ");
          function ᐊ$578ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$579ᝍ() && ᐊ$588ᝍ() && ᐊ$591ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$578ᝍ, "ᐊ$578ᝍ");
          function ᐊ$579ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$581ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$579ᝍ, "ᐊ$579ᝍ");
          function ᐊ$581ᝍ() {
            return printString(ᐊ$582ᝍ);
          }
          __name(ᐊ$581ᝍ, "ᐊ$581ᝍ");
          function ᐊ$582ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$582ᝍ, "ᐊ$582ᝍ");
          function ᐊ$588ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊ$590ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$588ᝍ, "ᐊ$588ᝍ");
          function ᐊ$590ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 0)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$590ᝍ, "ᐊ$590ᝍ");
          function ᐊ$591ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$593ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$591ᝍ, "ᐊ$591ᝍ");
          function ᐊ$593ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊ$594ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$593ᝍ, "ᐊ$593ᝍ");
          function ᐊ$594ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 255)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$594ᝍ, "ᐊ$594ᝍ");
          function ᐊcharRangeᝍ() {
            return ᐊ$595ᝍ() || ᐊ$610ᝍ() || ᐊ$626ᝍ() || ᐊ$642ᝍ();
          }
          __name(ᐊcharRangeᝍ, "ᐊcharRangeᝍ");
          function ᐊ$595ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$596ᝍ() && ᐊ$605ᝍ() && ᐊ$607ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$595ᝍ, "ᐊ$595ᝍ");
          function ᐊ$596ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$598ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$596ᝍ, "ᐊ$596ᝍ");
          function ᐊ$598ᝍ() {
            return printString(ᐊ$599ᝍ);
          }
          __name(ᐊ$598ᝍ, "ᐊ$598ᝍ");
          function ᐊ$599ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$599ᝍ, "ᐊ$599ᝍ");
          function ᐊ$605ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊintHexᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$605ᝍ, "ᐊ$605ᝍ");
          function ᐊ$607ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$609ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$607ᝍ, "ᐊ$607ᝍ");
          function ᐊ$609ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊintHexᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$609ᝍ, "ᐊ$609ᝍ");
          function ᐊ$610ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$611ᝍ() && ᐊ$620ᝍ() && ᐊ$622ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$610ᝍ, "ᐊ$610ᝍ");
          function ᐊ$611ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$613ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$611ᝍ, "ᐊ$611ᝍ");
          function ᐊ$613ᝍ() {
            return printString(ᐊ$614ᝍ);
          }
          __name(ᐊ$613ᝍ, "ᐊ$613ᝍ");
          function ᐊ$614ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$614ᝍ, "ᐊ$614ᝍ");
          function ᐊ$620ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊintHexᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$620ᝍ, "ᐊ$620ᝍ");
          function ᐊ$622ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$624ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$622ᝍ, "ᐊ$622ᝍ");
          function ᐊ$624ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊ$625ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$624ᝍ, "ᐊ$624ᝍ");
          function ᐊ$625ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 1114111)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$625ᝍ, "ᐊ$625ᝍ");
          function ᐊ$626ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$627ᝍ() && ᐊ$636ᝍ() && ᐊ$639ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$626ᝍ, "ᐊ$626ᝍ");
          function ᐊ$627ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$629ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$627ᝍ, "ᐊ$627ᝍ");
          function ᐊ$629ᝍ() {
            return printString(ᐊ$630ᝍ);
          }
          __name(ᐊ$629ᝍ, "ᐊ$629ᝍ");
          function ᐊ$630ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$630ᝍ, "ᐊ$630ᝍ");
          function ᐊ$636ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊ$638ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$636ᝍ, "ᐊ$636ᝍ");
          function ᐊ$638ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 0)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$638ᝍ, "ᐊ$638ᝍ");
          function ᐊ$639ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$641ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$639ᝍ, "ᐊ$639ᝍ");
          function ᐊ$641ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊintHexᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$641ᝍ, "ᐊ$641ᝍ");
          function ᐊ$642ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$643ᝍ() && ᐊ$652ᝍ() && ᐊ$655ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$642ᝍ, "ᐊ$642ᝍ");
          function ᐊ$643ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$645ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$643ᝍ, "ᐊ$643ᝍ");
          function ᐊ$645ᝍ() {
            return printString(ᐊ$646ᝍ);
          }
          __name(ᐊ$645ᝍ, "ᐊ$645ᝍ");
          function ᐊ$646ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$646ᝍ, "ᐊ$646ᝍ");
          function ᐊ$652ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊ$654ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$652ᝍ, "ᐊ$652ᝍ");
          function ᐊ$654ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 0)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$654ᝍ, "ᐊ$654ᝍ");
          function ᐊ$655ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$657ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$655ᝍ, "ᐊ$655ᝍ");
          function ᐊ$657ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊ$658ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$657ᝍ, "ᐊ$657ᝍ");
          function ᐊ$658ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 1114111)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$658ᝍ, "ᐊ$658ᝍ");
          function ᐊiterationRangeᝍ() {
            return ᐊ$659ᝍ() || ᐊ$674ᝍ() || ᐊ$690ᝍ() || ᐊ$706ᝍ();
          }
          __name(ᐊiterationRangeᝍ, "ᐊiterationRangeᝍ");
          function ᐊ$659ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$660ᝍ() && ᐊ$669ᝍ() && ᐊ$671ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$659ᝍ, "ᐊ$659ᝍ");
          function ᐊ$660ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$662ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$660ᝍ, "ᐊ$660ᝍ");
          function ᐊ$662ᝍ() {
            return printString(ᐊ$663ᝍ);
          }
          __name(ᐊ$662ᝍ, "ᐊ$662ᝍ");
          function ᐊ$663ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$663ᝍ, "ᐊ$663ᝍ");
          function ᐊ$669ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊintDecᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$669ᝍ, "ᐊ$669ᝍ");
          function ᐊ$671ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$673ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$671ᝍ, "ᐊ$671ᝍ");
          function ᐊ$673ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊintDecᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$673ᝍ, "ᐊ$673ᝍ");
          function ᐊ$674ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$675ᝍ() && ᐊ$684ᝍ() && ᐊ$686ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$674ᝍ, "ᐊ$674ᝍ");
          function ᐊ$675ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$677ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$675ᝍ, "ᐊ$675ᝍ");
          function ᐊ$677ᝍ() {
            return printString(ᐊ$678ᝍ);
          }
          __name(ᐊ$677ᝍ, "ᐊ$677ᝍ");
          function ᐊ$678ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$678ᝍ, "ᐊ$678ᝍ");
          function ᐊ$684ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊintDecᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$684ᝍ, "ᐊ$684ᝍ");
          function ᐊ$686ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$688ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$686ᝍ, "ᐊ$686ᝍ");
          function ᐊ$688ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊ$689ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$688ᝍ, "ᐊ$688ᝍ");
          function ᐊ$689ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 9007199254740991)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$689ᝍ, "ᐊ$689ᝍ");
          function ᐊ$690ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$691ᝍ() && ᐊ$700ᝍ() && ᐊ$703ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$690ᝍ, "ᐊ$690ᝍ");
          function ᐊ$691ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$693ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$691ᝍ, "ᐊ$691ᝍ");
          function ᐊ$693ᝍ() {
            return printString(ᐊ$694ᝍ);
          }
          __name(ᐊ$693ᝍ, "ᐊ$693ᝍ");
          function ᐊ$694ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$694ᝍ, "ᐊ$694ᝍ");
          function ᐊ$700ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊ$702ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$700ᝍ, "ᐊ$700ᝍ");
          function ᐊ$702ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 0)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$702ᝍ, "ᐊ$702ᝍ");
          function ᐊ$703ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$705ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$703ᝍ, "ᐊ$703ᝍ");
          function ᐊ$705ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊintDecᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$705ᝍ, "ᐊ$705ᝍ");
          function ᐊ$706ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$707ᝍ() && ᐊ$716ᝍ() && ᐊ$719ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$706ᝍ, "ᐊ$706ᝍ");
          function ᐊ$707ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$709ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$707ᝍ, "ᐊ$707ᝍ");
          function ᐊ$709ᝍ() {
            return printString(ᐊ$710ᝍ);
          }
          __name(ᐊ$709ᝍ, "ᐊ$709ᝍ");
          function ᐊ$710ᝍ() {
            if (IPOS + 5 > ILEN)
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
          __name(ᐊ$710ᝍ, "ᐊ$710ᝍ");
          function ᐊ$716ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "min" && ᐊ$718ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$716ᝍ, "ᐊ$716ᝍ");
          function ᐊ$718ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 0)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$718ᝍ, "ᐊ$718ᝍ");
          function ᐊ$719ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "max" && ᐊ$721ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$719ᝍ, "ᐊ$719ᝍ");
          function ᐊ$721ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊDDᝍ() && ᐊ$722ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$721ᝍ, "ᐊ$721ᝍ");
          function ᐊ$722ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== 9007199254740991)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$722ᝍ, "ᐊ$722ᝍ");
          function ᐊmetaᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$723ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊmetaᝍ, "ᐊmetaᝍ");
          function ᐊ$723ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "note" && ᐊ$725ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$723ᝍ, "ᐊ$723ᝍ");
          function ᐊ$725ᝍ() {
            return printString(ᐊnoteᝍ);
          }
          __name(ᐊ$725ᝍ, "ᐊ$725ᝍ");
          function ᐊnoteᝍ() {
            return ᐊnote$startᝍ();
          }
          __name(ᐊnoteᝍ, "ᐊnoteᝍ");
          function ᐊnote$startᝍ() {
            return ᐊ$726ᝍ() || ᐊnote$noCommentᝍ();
          }
          __name(ᐊnote$startᝍ, "ᐊnote$startᝍ");
          function ᐊ$726ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊnote$commentStartᝍ() && ᐊ$727ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$726ᝍ, "ᐊ$726ᝍ");
          function ᐊ$727ᝍ() {
            if (!ᐊnote$commentCharᝍ())
              return false;
            while (true) {
              if (!ᐊnote$commentCharᝍ())
                return true;
            }
          }
          __name(ᐊ$727ᝍ, "ᐊ$727ᝍ");
          function ᐊnote$commentStartᝍ() {
            return ᐊ$733ᝍ();
          }
          __name(ᐊnote$commentStartᝍ, "ᐊnote$commentStartᝍ");
          function ᐊ$733ᝍ() {
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 32;
            OUT[OPOS++] = 35;
            OUT[OPOS++] = 32;
            return true;
          }
          __name(ᐊ$733ᝍ, "ᐊ$733ᝍ");
          function ᐊnote$commentCharᝍ() {
            return ᐊnote$escapedCrᝍ() || ᐊnote$escapedLfᝍ() || ᐊnote$nonNewlineCharᝍ();
          }
          __name(ᐊnote$commentCharᝍ, "ᐊnote$commentCharᝍ");
          function ᐊnote$escapedCrᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$740ᝍ() && ᐊ$743ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊnote$escapedCrᝍ, "ᐊnote$escapedCrᝍ");
          function ᐊ$740ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 114;
            return true;
          }
          __name(ᐊ$740ᝍ, "ᐊ$740ᝍ");
          function ᐊ$743ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 13)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$743ᝍ, "ᐊ$743ᝍ");
          function ᐊnote$escapedLfᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$744ᝍ() && ᐊ$747ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊnote$escapedLfᝍ, "ᐊnote$escapedLfᝍ");
          function ᐊ$744ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 110;
            return true;
          }
          __name(ᐊ$744ᝍ, "ᐊ$744ᝍ");
          function ᐊ$747ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 10)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$747ᝍ, "ᐊ$747ᝍ");
          function ᐊnote$nonNewlineCharᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$748ᝍ() && ᐊ$754ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊnote$nonNewlineCharᝍ, "ᐊnote$nonNewlineCharᝍ");
          function ᐊ$748ᝍ() {
            return ᐊ$753ᝍ();
          }
          __name(ᐊ$748ᝍ, "ᐊ$748ᝍ");
          function ᐊ$753ᝍ() {
            return true;
          }
          __name(ᐊ$753ᝍ, "ᐊ$753ᝍ");
          function ᐊ$754ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            IPOS += 1;
            writeUtf8Codepoint(cp);
            return true;
          }
          __name(ᐊ$754ᝍ, "ᐊ$754ᝍ");
          function ᐊnote$noCommentᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$755ᝍ() && ᐊ$756ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊnote$noCommentᝍ, "ᐊnote$noCommentᝍ");
          function ᐊ$755ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊHSᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$755ᝍ, "ᐊ$755ᝍ");
          function ᐊ$756ᝍ() {
            return true;
          }
          __name(ᐊ$756ᝍ, "ᐊ$756ᝍ");
          function ᐊnumᝍ() {
            return ᐊ$757ᝍ() || ᐊ$762ᝍ();
          }
          __name(ᐊnumᝍ, "ᐊnumᝍ");
          function ᐊ$757ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$758ᝍ() && ᐊ$761ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$757ᝍ, "ᐊ$757ᝍ");
          function ᐊ$758ᝍ() {
            OUT[OPOS++] = 48;
            OUT[OPOS++] = 120;
            return true;
          }
          __name(ᐊ$758ᝍ, "ᐊ$758ᝍ");
          var ᐊ$761ᝍ = createUtf8IntPrinter({ base: 16, signed: false });
          var ᐊ$762ᝍ = printUtf8Float;
          function ᐊintDecᝍ() {
            return ᐊ$770ᝍ();
          }
          __name(ᐊintDecᝍ, "ᐊintDecᝍ");
          var ᐊ$770ᝍ = createUtf8IntPrinter({ base: 10, signed: true });
          function ᐊintHexᝍ() {
            return ᐊ$771ᝍ() || ᐊ$776ᝍ();
          }
          __name(ᐊintHexᝍ, "ᐊintHexᝍ");
          function ᐊ$771ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$772ᝍ() && ᐊ$775ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$771ᝍ, "ᐊ$771ᝍ");
          function ᐊ$772ᝍ() {
            OUT[OPOS++] = 48;
            OUT[OPOS++] = 120;
            return true;
          }
          __name(ᐊ$772ᝍ, "ᐊ$772ᝍ");
          var ᐊ$775ᝍ = createUtf8IntPrinter({ base: 16, signed: false });
          var ᐊ$776ᝍ = createUtf8IntPrinter({ base: 10, signed: true });
          function ᐊstrᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$777ᝍ() && ᐊ$778ᝍ() && ᐊ$781ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊstrᝍ, "ᐊstrᝍ");
          function ᐊ$777ᝍ() {
            OUT[OPOS++] = 39;
            return true;
          }
          __name(ᐊ$777ᝍ, "ᐊ$777ᝍ");
          function ᐊ$778ᝍ() {
            return ᐊ$779ᝍ() || ᐊ$780ᝍ();
          }
          __name(ᐊ$778ᝍ, "ᐊ$778ᝍ");
          function ᐊ$779ᝍ() {
            if (!ᐊstrItemᝍ())
              return false;
            while (true) {
              if (!ᐊstrItemᝍ())
                return true;
            }
          }
          __name(ᐊ$779ᝍ, "ᐊ$779ᝍ");
          function ᐊ$780ᝍ() {
            return true;
          }
          __name(ᐊ$780ᝍ, "ᐊ$780ᝍ");
          function ᐊ$781ᝍ() {
            OUT[OPOS++] = 39;
            return true;
          }
          __name(ᐊ$781ᝍ, "ᐊ$781ᝍ");
          function ᐊstrItemᝍ() {
            return ᐊ$782ᝍ() || ᐊ$789ᝍ() || ᐊ$794ᝍ() || ᐊ$799ᝍ() || ᐊ$804ᝍ() || ᐊ$809ᝍ() || ᐊ$814ᝍ() || ᐊ$819ᝍ() || ᐊ$824ᝍ() || ᐊ$829ᝍ();
          }
          __name(ᐊstrItemᝍ, "ᐊstrItemᝍ");
          function ᐊ$782ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$783ᝍ() && ᐊ$788ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$782ᝍ, "ᐊ$782ᝍ");
          function ᐊ$783ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᐊ$784ᝍ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᐊ$783ᝍ, "ᐊ$783ᝍ");
          function ᐊ$784ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp > 31 && cp !== 92 && cp !== 39)
              return false;
            OUT[OPOS++] = cp;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$784ᝍ, "ᐊ$784ᝍ");
          function ᐊ$788ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            IPOS += 1;
            writeUtf8Codepoint(cp);
            return true;
          }
          __name(ᐊ$788ᝍ, "ᐊ$788ᝍ");
          function ᐊ$789ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$790ᝍ() && ᐊ$793ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$789ᝍ, "ᐊ$789ᝍ");
          function ᐊ$790ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 98;
            return true;
          }
          __name(ᐊ$790ᝍ, "ᐊ$790ᝍ");
          function ᐊ$793ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 8)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$793ᝍ, "ᐊ$793ᝍ");
          function ᐊ$794ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$795ᝍ() && ᐊ$798ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$794ᝍ, "ᐊ$794ᝍ");
          function ᐊ$795ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 102;
            return true;
          }
          __name(ᐊ$795ᝍ, "ᐊ$795ᝍ");
          function ᐊ$798ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 12)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$798ᝍ, "ᐊ$798ᝍ");
          function ᐊ$799ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$800ᝍ() && ᐊ$803ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$799ᝍ, "ᐊ$799ᝍ");
          function ᐊ$800ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 110;
            return true;
          }
          __name(ᐊ$800ᝍ, "ᐊ$800ᝍ");
          function ᐊ$803ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 10)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$803ᝍ, "ᐊ$803ᝍ");
          function ᐊ$804ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$805ᝍ() && ᐊ$808ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$804ᝍ, "ᐊ$804ᝍ");
          function ᐊ$805ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 114;
            return true;
          }
          __name(ᐊ$805ᝍ, "ᐊ$805ᝍ");
          function ᐊ$808ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 13)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$808ᝍ, "ᐊ$808ᝍ");
          function ᐊ$809ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$810ᝍ() && ᐊ$813ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$809ᝍ, "ᐊ$809ᝍ");
          function ᐊ$810ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 116;
            return true;
          }
          __name(ᐊ$810ᝍ, "ᐊ$810ᝍ");
          function ᐊ$813ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 9)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$813ᝍ, "ᐊ$813ᝍ");
          function ᐊ$814ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$815ᝍ() && ᐊ$818ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$814ᝍ, "ᐊ$814ᝍ");
          function ᐊ$815ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 118;
            return true;
          }
          __name(ᐊ$815ᝍ, "ᐊ$815ᝍ");
          function ᐊ$818ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 11)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$818ᝍ, "ᐊ$818ᝍ");
          function ᐊ$819ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$820ᝍ() && ᐊ$823ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$819ᝍ, "ᐊ$819ᝍ");
          function ᐊ$820ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 92;
            return true;
          }
          __name(ᐊ$820ᝍ, "ᐊ$820ᝍ");
          function ᐊ$823ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 92)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$823ᝍ, "ᐊ$823ᝍ");
          function ᐊ$824ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$825ᝍ() && ᐊ$828ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$824ᝍ, "ᐊ$824ᝍ");
          function ᐊ$825ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 39;
            return true;
          }
          __name(ᐊ$825ᝍ, "ᐊ$825ᝍ");
          function ᐊ$828ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 39)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$828ᝍ, "ᐊ$828ᝍ");
          function ᐊ$829ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$830ᝍ() && ᐊ$833ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$829ᝍ, "ᐊ$829ᝍ");
          function ᐊ$830ᝍ() {
            OUT[OPOS++] = 92;
            OUT[OPOS++] = 34;
            return true;
          }
          __name(ᐊ$830ᝍ, "ᐊ$830ᝍ");
          function ᐊ$833ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if (cp !== 34)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$833ᝍ, "ᐊ$833ᝍ");
          function ᐊboolᝍ() {
            return ᐊ$834ᝍ() || ᐊ$850ᝍ();
          }
          __name(ᐊboolᝍ, "ᐊboolᝍ");
          function ᐊ$834ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$835ᝍ() && ᐊ$840ᝍ() && ᐊ$849ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$834ᝍ, "ᐊ$834ᝍ");
          function ᐊ$835ᝍ() {
            OUT[OPOS++] = 116;
            OUT[OPOS++] = 114;
            OUT[OPOS++] = 117;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᐊ$835ᝍ, "ᐊ$835ᝍ");
          function ᐊ$840ᝍ() {
            return ᐊ$848ᝍ();
          }
          __name(ᐊ$840ᝍ, "ᐊ$840ᝍ");
          function ᐊ$848ᝍ() {
            return true;
          }
          __name(ᐊ$848ᝍ, "ᐊ$848ᝍ");
          function ᐊ$849ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== true)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$849ᝍ, "ᐊ$849ᝍ");
          function ᐊ$850ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$851ᝍ() && ᐊ$857ᝍ() && ᐊ$866ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$850ᝍ, "ᐊ$850ᝍ");
          function ᐊ$851ᝍ() {
            OUT[OPOS++] = 102;
            OUT[OPOS++] = 97;
            OUT[OPOS++] = 108;
            OUT[OPOS++] = 115;
            OUT[OPOS++] = 101;
            return true;
          }
          __name(ᐊ$851ᝍ, "ᐊ$851ᝍ");
          function ᐊ$857ᝍ() {
            return ᐊ$865ᝍ();
          }
          __name(ᐊ$857ᝍ, "ᐊ$857ᝍ");
          function ᐊ$865ᝍ() {
            return true;
          }
          __name(ᐊ$865ᝍ, "ᐊ$865ᝍ");
          function ᐊ$866ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== false)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$866ᝍ, "ᐊ$866ᝍ");
          function ᐊnull_ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$867ᝍ() && ᐊ$872ᝍ() && ᐊ$881ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊnull_ᝍ, "ᐊnull_ᝍ");
          function ᐊ$867ᝍ() {
            OUT[OPOS++] = 110;
            OUT[OPOS++] = 117;
            OUT[OPOS++] = 108;
            OUT[OPOS++] = 108;
            return true;
          }
          __name(ᐊ$867ᝍ, "ᐊ$867ᝍ");
          function ᐊ$872ᝍ() {
            return ᐊ$880ᝍ();
          }
          __name(ᐊ$872ᝍ, "ᐊ$872ᝍ");
          function ᐊ$880ᝍ() {
            return true;
          }
          __name(ᐊ$880ᝍ, "ᐊ$880ᝍ");
          function ᐊ$881ᝍ() {
            if (IPOS >= ILEN)
              return false;
            if (IN[IPOS] !== null)
              return false;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$881ᝍ, "ᐊ$881ᝍ");
          function ᐊrefᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$882ᝍ() && ᐊ$889ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊrefᝍ, "ᐊrefᝍ");
          function ᐊ$882ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "kind" && ᐊ$884ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$882ᝍ, "ᐊ$882ᝍ");
          function ᐊ$884ᝍ() {
            return printString(ᐊ$885ᝍ);
          }
          __name(ᐊ$884ᝍ, "ᐊ$884ᝍ");
          function ᐊ$885ᝍ() {
            if (IPOS + 3 > ILEN)
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
          __name(ᐊ$885ᝍ, "ᐊ$885ᝍ");
          function ᐊ$889ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS, i = IPOS;
            for (var i = IPOS; ; i += 2) {
              if (i >= ILEN)
                return false;
              IPOS = i;
              if (IN[IPOS++] === "name" && ᐊ$891ᝍ())
                break;
              IPOS = IPOSₒ, OPOS = OPOSₒ;
            }
            if (i === IPOSₒ)
              return true;
            else
              IPOS = IPOSₒ + 2;
            [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
            return true;
          }
          __name(ᐊ$889ᝍ, "ᐊ$889ᝍ");
          function ᐊ$891ᝍ() {
            return printString(ᐊidᝍ);
          }
          __name(ᐊ$891ᝍ, "ᐊ$891ᝍ");
          function ᐊidᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$892ᝍ() && ᐊ$897ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊidᝍ, "ᐊidᝍ");
          function ᐊ$892ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36)
              return false;
            OUT[OPOS++] = cp;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$892ᝍ, "ᐊ$892ᝍ");
          function ᐊ$897ᝍ() {
            while (ᐊ$898ᝍ())
              ;
            return true;
          }
          __name(ᐊ$897ᝍ, "ᐊ$897ᝍ");
          function ᐊ$898ᝍ() {
            if (IPOS >= ILEN)
              return false;
            var cp = IN[IPOS];
            if ((cp < 97 || cp > 122) && (cp < 65 || cp > 90) && cp !== 95 && cp !== 36 && (cp < 48 || cp > 57))
              return false;
            OUT[OPOS++] = cp;
            IPOS += 1;
            return true;
          }
          __name(ᐊ$898ᝍ, "ᐊ$898ᝍ");
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
          function ᐊLBᝍ() {
            OUT[OPOS++] = 91;
            return true;
          }
          __name(ᐊLBᝍ, "ᐊLBᝍ");
          function ᐊRBᝍ() {
            OUT[OPOS++] = 93;
            return true;
          }
          __name(ᐊRBᝍ, "ᐊRBᝍ");
          function ᐊWSᝍ() {
            if (!ᐊ$906ᝍ())
              return false;
            while (true) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊ$906ᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
          }
          __name(ᐊWSᝍ, "ᐊWSᝍ");
          function ᐊ$906ᝍ() {
            return ᐊHSᝍ() || ᐊCOMMENTᝍ() || ᐊEOLᝍ();
          }
          __name(ᐊ$906ᝍ, "ᐊ$906ᝍ");
          function ᐊHSᝍ() {
            if (!ᐊ$907ᝍ())
              return false;
            while (true) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊ$907ᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
          }
          __name(ᐊHSᝍ, "ᐊHSᝍ");
          function ᐊ$907ᝍ() {
            OUT[OPOS++] = 32;
            return true;
          }
          __name(ᐊ$907ᝍ, "ᐊ$907ᝍ");
          function ᐊCOMMENTᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$910ᝍ() && ᐊ$911ᝍ() && ᐊ$913ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊCOMMENTᝍ, "ᐊCOMMENTᝍ");
          function ᐊ$910ᝍ() {
            OUT[OPOS++] = 35;
            return true;
          }
          __name(ᐊ$910ᝍ, "ᐊ$910ᝍ");
          function ᐊ$911ᝍ() {
            for (var count = 1; count; --count) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊ$912ᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
            return true;
          }
          __name(ᐊ$911ᝍ, "ᐊ$911ᝍ");
          function ᐊ$912ᝍ() {
            OUT[OPOS++] = 32;
            return true;
          }
          __name(ᐊ$912ᝍ, "ᐊ$912ᝍ");
          function ᐊ$913ᝍ() {
            while (true) {
              var IPOSₒ = IPOS, OPOSₒ = OPOS;
              if (!ᐊ$914ᝍ() || IPOS === IPOSₒ)
                return IPOS = IPOSₒ, OPOS = OPOSₒ, true;
            }
          }
          __name(ᐊ$913ᝍ, "ᐊ$913ᝍ");
          function ᐊ$914ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            if (ᐊ$915ᝍ() && ᐊ$917ᝍ() && ᐊ$919ᝍ())
              return true;
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return false;
          }
          __name(ᐊ$914ᝍ, "ᐊ$914ᝍ");
          function ᐊ$915ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᐊ$916ᝍ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᐊ$915ᝍ, "ᐊ$915ᝍ");
          function ᐊ$916ᝍ() {
            OUT[OPOS++] = 13;
            return true;
          }
          __name(ᐊ$916ᝍ, "ᐊ$916ᝍ");
          function ᐊ$917ᝍ() {
            var IPOSₒ = IPOS, OPOSₒ = OPOS;
            var result = !ᐊ$918ᝍ();
            IPOS = IPOSₒ, OPOS = OPOSₒ;
            return result;
          }
          __name(ᐊ$917ᝍ, "ᐊ$917ᝍ");
          function ᐊ$918ᝍ() {
            OUT[OPOS++] = 10;
            return true;
          }
          __name(ᐊ$918ᝍ, "ᐊ$918ᝍ");
          function ᐊ$919ᝍ() {
            OUT[OPOS++] = 0;
            return true;
          }
          __name(ᐊ$919ᝍ, "ᐊ$919ᝍ");
          function ᐊEOLᝍ() {
            return ᐊ$920ᝍ() || ᐊ$923ᝍ() || ᐊ$924ᝍ();
          }
          __name(ᐊEOLᝍ, "ᐊEOLᝍ");
          function ᐊ$920ᝍ() {
            OUT[OPOS++] = 13;
            OUT[OPOS++] = 10;
            return true;
          }
          __name(ᐊ$920ᝍ, "ᐊ$920ᝍ");
          function ᐊ$923ᝍ() {
            OUT[OPOS++] = 13;
            return true;
          }
          __name(ᐊ$923ᝍ, "ᐊ$923ᝍ");
          function ᐊ$924ᝍ() {
            OUT[OPOS++] = 10;
            return true;
          }
          __name(ᐊ$924ᝍ, "ᐊ$924ᝍ");
          return $print;
        }()
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
        var peg$c39 = "\\n";
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
        var peg$e54 = peg$literalExpectation2("]", false);
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
        var peg$f45 = /* @__PURE__ */ __name(function(expression) {
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
              s0 = peg$f45(s2);
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
                peg$fail2(peg$e54);
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
                  peg$fail2(peg$e54);
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
                peg$fail2(peg$e54);
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
          if (input2.substr(peg$currPos2, 2) === peg$c39) {
            s1 = peg$c39;
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
        var peg$startRuleFunctions = { Start: peg$parseStart };
        var peg$startRuleFunction = peg$parseStart;
        var peg$c0 = "||";
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
        var peg$c15 = "=";
        var peg$c16 = ":";
        var peg$c17 = "...";
        var peg$c18 = "-";
        var peg$c19 = "\\";
        var peg$c20 = "\\u";
        var peg$c21 = "\\u{";
        var peg$c22 = "char";
        var peg$c23 = "false";
        var peg$c24 = "nil";
        var peg$c25 = "true";
        var peg$c26 = "__bin";
        var peg$c27 = "__float";
        var peg$c28 = "__int";
        var peg$c29 = "__hex";
        var peg$c30 = "__ind";
        var peg$c31 = "__ded";
        var peg$c32 = "__tab";
        var peg$c33 = "//";
        var peg$c34 = " ";
        var peg$c35 = "	";
        var peg$c36 = "\r\n";
        var peg$c37 = "\n";
        var peg$c38 = "\r";
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
        var peg$e0 = peg$literalExpectation("||", false);
        var peg$e1 = peg$literalExpectation("|", false);
        var peg$e2 = peg$classExpectation(["&", "!"], false, false);
        var peg$e3 = peg$classExpectation(["?", "*", "+"], false, false);
        var peg$e4 = peg$classExpectation(["=", ":"], false, false);
        var peg$e5 = peg$classExpectation([["0", "9"]], false, false);
        var peg$e6 = peg$literalExpectation("#", false);
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
        var peg$e22 = peg$literalExpectation("=", false);
        var peg$e23 = peg$literalExpectation(":", false);
        var peg$e24 = peg$literalExpectation("...", false);
        var peg$e25 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false);
        var peg$e26 = peg$classExpectation(["'", '"', "`", "[", "\r", "\n"], false, false);
        var peg$e27 = peg$classExpectation(["]", "\r", "\n"], false, false);
        var peg$e28 = peg$literalExpectation("-", false);
        var peg$e29 = peg$classExpectation([["\0", ""]], false, false);
        var peg$e30 = peg$classExpectation(["\\", "'", '"', "`", "["], false, false);
        var peg$e31 = peg$anyExpectation();
        var peg$e32 = peg$literalExpectation("\\", false);
        var peg$e33 = peg$classExpectation(["b", "f", "n", "r", "t", "v", "\\", "'", '"', "`", "["], false, false);
        var peg$e34 = peg$literalExpectation("\\u", false);
        var peg$e35 = peg$literalExpectation("\\u{", false);
        var peg$e36 = peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false);
        var peg$e37 = peg$literalExpectation("char", false);
        var peg$e38 = peg$literalExpectation("false", false);
        var peg$e39 = peg$literalExpectation("nil", false);
        var peg$e40 = peg$literalExpectation("true", false);
        var peg$e41 = peg$literalExpectation("__bin", false);
        var peg$e42 = peg$literalExpectation("__float", false);
        var peg$e43 = peg$literalExpectation("__int", false);
        var peg$e44 = peg$literalExpectation("__hex", false);
        var peg$e45 = peg$literalExpectation("__ind", false);
        var peg$e46 = peg$literalExpectation("__ded", false);
        var peg$e47 = peg$literalExpectation("__tab", false);
        var peg$e48 = peg$literalExpectation("//", false);
        var peg$e49 = peg$literalExpectation(" ", false);
        var peg$e50 = peg$literalExpectation("	", false);
        var peg$e51 = peg$literalExpectation("\r\n", false);
        var peg$e52 = peg$literalExpectation("\n", false);
        var peg$e53 = peg$literalExpectation("\r", false);
        var peg$f0 = /* @__PURE__ */ __name(function(grammar) {
          return grammar;
        }, "peg$f0");
        var peg$f1 = /* @__PURE__ */ __name(function(h, t) {
          return t ? { kind: "Dual", parse: h, print: t[3], text: text() } : h;
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
          return { kind: "Scalar", value: Number(text()), text: text() };
        }, "peg$f11");
        var peg$f12 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicBin", text: text() };
        }, "peg$f12");
        var peg$f13 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicFloat", text: text() };
        }, "peg$f13");
        var peg$f14 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicInt", text: text() };
        }, "peg$f14");
        var peg$f15 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicHex", text: text() };
        }, "peg$f15");
        var peg$f16 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicInd", text: text() };
        }, "peg$f16");
        var peg$f17 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicDed", text: text() };
        }, "peg$f17");
        var peg$f18 = /* @__PURE__ */ __name(function() {
          return { kind: "IntrinsicTab", text: text() };
        }, "peg$f18");
        var peg$f19 = /* @__PURE__ */ __name(function(head, tail) {
          return { kind: "ByteList", items: (head !== void 0 ? [head] : []).concat(tail.map((el) => el[1])), text: text() };
        }, "peg$f19");
        var peg$f20 = /* @__PURE__ */ __name(function(head, tail) {
          return { kind: "ByteList", items: (head !== void 0 ? [head] : []).concat(tail.map((el) => el[1])), text: text() };
        }, "peg$f20");
        var peg$f21 = /* @__PURE__ */ __name(function(items) {
          return { kind: "StringX", items, text: text() };
        }, "peg$f21");
        var peg$f22 = /* @__PURE__ */ __name(function(items) {
          return { kind: "StringA", items, text: text() };
        }, "peg$f22");
        var peg$f23 = /* @__PURE__ */ __name(function(items) {
          return { kind: "StringC", items, text: text() };
        }, "peg$f23");
        var peg$f24 = /* @__PURE__ */ __name(function(head, tail) {
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
        }, "peg$f24");
        var peg$f25 = /* @__PURE__ */ __name(function(head, tail) {
          const items = (head ? [head] : []).concat(tail.map((el) => el[3]));
          return { kind: "List", items, text: text() };
        }, "peg$f25");
        var peg$f26 = /* @__PURE__ */ __name(function(grammarOrExpression) {
          return grammarOrExpression;
        }, "peg$f26");
        var peg$f27 = /* @__PURE__ */ __name(function(h, t) {
          return { kind: "Grammar", definitions: [h].concat(t.map((el) => el[1])), text: text() };
        }, "peg$f27");
        var peg$f28 = /* @__PURE__ */ __name(function(lhs, rhs) {
          return { kind: "Definition", lhs, rhs };
        }, "peg$f28");
        var peg$f29 = /* @__PURE__ */ __name(function(h, t) {
          return h + t.join("");
        }, "peg$f29");
        var peg$f30 = /* @__PURE__ */ __name(function(label2, expression) {
          return { kind: "Field", label: label2, expression };
        }, "peg$f30");
        var peg$f31 = /* @__PURE__ */ __name(function(label2, expression) {
          return { kind: "Field", label: label2, expression };
        }, "peg$f31");
        var peg$f32 = /* @__PURE__ */ __name(function(expression) {
          return { kind: "Splice", expression };
        }, "peg$f32");
        var peg$f33 = /* @__PURE__ */ __name(function(cs) {
          return cs.map((el) => el[1]).join("");
        }, "peg$f33");
        var peg$f34 = /* @__PURE__ */ __name(function(items) {
          return items.map((el) => el[1]);
        }, "peg$f34");
        var peg$f35 = /* @__PURE__ */ __name(function(min, max) {
          if (max < min)
            expected(`${min} <= ${max} in range [${min}-${max}]`);
          return [min, max];
        }, "peg$f35");
        var peg$f36 = /* @__PURE__ */ __name(function(c2) {
          return [c2, c2];
        }, "peg$f36");
        var peg$f37 = /* @__PURE__ */ __name(function() {
          return text();
        }, "peg$f37");
        var peg$f38 = /* @__PURE__ */ __name(function(c) {
          return eval(`"${text()}"`);
        }, "peg$f38");
        var peg$f39 = /* @__PURE__ */ __name(function() {
          return eval(`"${text()}"`);
        }, "peg$f39");
        var peg$f40 = /* @__PURE__ */ __name(function(d) {
          return eval(`"${text()}"`);
        }, "peg$f40");
        var peg$f41 = /* @__PURE__ */ __name(function(min, max) {
          return [min, max];
        }, "peg$f41");
        var peg$f42 = /* @__PURE__ */ __name(function(min, max) {
          return [min, max];
        }, "peg$f42");
        var peg$f43 = /* @__PURE__ */ __name(function() {
          const v = parseInt(text(), 10);
          if (v > 255)
            expected("value in range 0..255");
          else
            return v;
        }, "peg$f43");
        var peg$f44 = /* @__PURE__ */ __name(function() {
          const v = parseInt(text(), 16);
          if (v > 255)
            expected("value in range 0..255");
          else
            return v;
        }, "peg$f44");
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
        function peg$parseStart() {
          var s0, s1, s2, s3, s4;
          s0 = peg$currPos;
          s1 = peg$parseWS();
          s2 = peg$parseGrammar();
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
        __name(peg$parseStart, "peg$parseStart");
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
                    s0 = peg$parseNumber();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseIntrinsicBin();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseIntrinsicFloat();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseIntrinsicInt();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parseIntrinsicHex();
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
                                          if (s0 === peg$FAILED) {
                                            s0 = peg$parseIntrinsicInd();
                                            if (s0 === peg$FAILED) {
                                              s0 = peg$parseIntrinsicDed();
                                              if (s0 === peg$FAILED) {
                                                s0 = peg$parseIntrinsicTab();
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
              }
            }
          }
          return s0;
        }
        __name(peg$parsePrecedence1, "peg$parsePrecedence1");
        function peg$parseDual() {
          var s0, s1, s2, s3, s4, s5, s6;
          s0 = peg$currPos;
          s1 = peg$parseChoice();
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseWS();
            if (input.substr(peg$currPos, 2) === peg$c0) {
              s4 = peg$c0;
              peg$currPos += 2;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e0);
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseWS();
              s6 = peg$parseChoice();
              if (s6 !== peg$FAILED) {
                s3 = [s3, s4, s5, s6];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            peg$savedPos = s0;
            s0 = peg$f1(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        __name(peg$parseDual, "peg$parseDual");
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
        function peg$parseNumber() {
          var s0, s1, s2;
          s0 = peg$currPos;
          s1 = [];
          if (peg$r3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
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
                  peg$fail(peg$e5);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f11();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseNumber, "peg$parseNumber");
        function peg$parseIntrinsicBin() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUBIN();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f12();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicBin, "peg$parseIntrinsicBin");
        function peg$parseIntrinsicFloat() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_UUFLOAT();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f13();
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
            s1 = peg$f14();
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
            s1 = peg$f15();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicHex, "peg$parseIntrinsicHex");
        function peg$parseIntrinsicInd() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_IND();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f16();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicInd, "peg$parseIntrinsicInd");
        function peg$parseIntrinsicDed() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_DED();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f17();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicDed, "peg$parseIntrinsicDed");
        function peg$parseIntrinsicTab() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parseK_TAB();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f18();
          }
          s0 = s1;
          return s0;
        }
        __name(peg$parseIntrinsicTab, "peg$parseIntrinsicTab");
        function peg$parseByteList() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c2;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e6);
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
                peg$fail(peg$e5);
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
                s0 = peg$f19(s3, s4);
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
                s0 = peg$f20(s2, s3);
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
              s0 = peg$f21(s2);
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
              s0 = peg$f22(s2);
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
              s0 = peg$f23(s2);
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
                s0 = peg$f24(s4, s5);
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
                s4 = peg$parseDual();
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
                  s10 = peg$parseDual();
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
                    s10 = peg$parseDual();
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
                  s0 = peg$f25(s4, s5);
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
            s3 = peg$parseGrammar();
            if (s3 === peg$FAILED) {
              s3 = peg$parseDual();
            }
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
                s0 = peg$f26(s3);
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
        function peg$parseGrammar() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = peg$parseDefinition();
          if (s1 !== peg$FAILED) {
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
            peg$savedPos = s0;
            s0 = peg$f27(s1, s2);
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
              s5 = peg$parseDual();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f28(s1, s5);
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
              s0 = peg$f29(s2, s3);
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
            s3 = peg$parseDual();
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
                  s7 = peg$c16;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e23);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseWS();
                  s9 = peg$parseDual();
                  if (s9 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s0 = peg$f30(s3, s9);
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
                s3 = peg$c16;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e23);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parseWS();
                s5 = peg$parseDual();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s0 = peg$f31(s1, s5);
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
          if (input.substr(peg$currPos, 3) === peg$c17) {
            s1 = peg$c17;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e24);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseWS();
            s3 = peg$parseDual();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f32(s3);
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
              peg$fail(peg$e25);
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
                peg$fail(peg$e5);
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
              peg$fail(peg$e26);
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
                  peg$fail(peg$e26);
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
            s1 = peg$f33(s1);
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
                peg$fail(peg$e27);
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
                    peg$fail(peg$e27);
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
                s0 = peg$f34(s2);
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
              s2 = peg$c18;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e28);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseChar();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f35(s1, s3);
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
              s1 = peg$f36(s1);
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
              peg$fail(peg$e29);
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
                peg$fail(peg$e30);
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
                  peg$fail(peg$e31);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f37();
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
              s1 = peg$c19;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e32);
              }
            }
            if (s1 !== peg$FAILED) {
              if (peg$r12.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e33);
                }
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f38(s2);
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
              if (input.substr(peg$currPos, 2) === peg$c20) {
                s1 = peg$c20;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e34);
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
                        s0 = peg$f39();
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
                if (input.substr(peg$currPos, 3) === peg$c21) {
                  s1 = peg$c21;
                  peg$currPos += 3;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e35);
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
                      s0 = peg$f40(s2);
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
              s2 = peg$c18;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e28);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseByteDec();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f41(s1, s3);
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
              s2 = peg$c18;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e28);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseByteHex();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f42(s1, s3);
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
              peg$fail(peg$e5);
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
                  peg$fail(peg$e5);
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
              s0 = peg$f43();
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
              s0 = peg$f44();
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
              peg$fail(peg$e36);
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
                  s0 = peg$parseK_UUBIN();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseK_UUFLOAT();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseK_UUINT();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseK_UUHEX();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseK_IND();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parseK_DED();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parseK_TAB();
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
        __name(peg$parseKeyword, "peg$parseKeyword");
        function peg$parseK_CHAR() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 4;
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
        __name(peg$parseK_CHAR, "peg$parseK_CHAR");
        function peg$parseK_FALSE() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c23) {
            s1 = peg$c23;
            peg$currPos += 5;
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
        __name(peg$parseK_FALSE, "peg$parseK_FALSE");
        function peg$parseK_NIL() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c24) {
            s1 = peg$c24;
            peg$currPos += 3;
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
        __name(peg$parseK_NIL, "peg$parseK_NIL");
        function peg$parseK_TRUE() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c25) {
            s1 = peg$c25;
            peg$currPos += 4;
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
        __name(peg$parseK_TRUE, "peg$parseK_TRUE");
        function peg$parseK_UUBIN() {
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
        __name(peg$parseK_UUBIN, "peg$parseK_UUBIN");
        function peg$parseK_UUFLOAT() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 7) === peg$c27) {
            s1 = peg$c27;
            peg$currPos += 7;
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
        __name(peg$parseK_UUFLOAT, "peg$parseK_UUFLOAT");
        function peg$parseK_UUINT() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c28) {
            s1 = peg$c28;
            peg$currPos += 5;
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
        __name(peg$parseK_UUINT, "peg$parseK_UUINT");
        function peg$parseK_UUHEX() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 5;
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
        __name(peg$parseK_UUHEX, "peg$parseK_UUHEX");
        function peg$parseK_IND() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c30) {
            s1 = peg$c30;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e45);
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
        __name(peg$parseK_IND, "peg$parseK_IND");
        function peg$parseK_DED() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c31) {
            s1 = peg$c31;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e46);
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
        __name(peg$parseK_DED, "peg$parseK_DED");
        function peg$parseK_TAB() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c32) {
            s1 = peg$c32;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e47);
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
        __name(peg$parseK_TAB, "peg$parseK_TAB");
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
          if (input.substr(peg$currPos, 2) === peg$c33) {
            s1 = peg$c33;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e48);
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
                  peg$fail(peg$e31);
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
                    peg$fail(peg$e31);
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
            s0 = peg$c34;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e49);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 9) {
              s0 = peg$c35;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e50);
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
          if (input.substr(peg$currPos, 2) === peg$c36) {
            s0 = peg$c36;
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e51);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
              s0 = peg$c37;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e52);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 13) {
                s0 = peg$c38;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e53);
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
              peg$fail(peg$e31);
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

  // src/api.ts
  var api_exports = {};
  __export(api_exports, {
    penc: () => penc
  });

  // src/utils/memoise.ts
  function memoise(info) {
    const memoisedResults = /* @__PURE__ */ new Map();
    const calculateResultForNewInput = info(memoisedResults);
    return (input2) => {
      if (!memoisedResults.has(input2)) {
        memoisedResults.set(input2, CALCULATING);
        const result2 = calculateResultForNewInput(input2);
        memoisedResults.set(input2, result2);
        return result2;
      }
      let result = memoisedResults.get(input2);
      if (result === CALCULATING)
        throw new Error("Infinite recursion detected");
      return result;
    };
  }
  __name(memoise, "memoise");
  var CALCULATING = Symbol("CALCULATING");

  // src/backends/js/create-mod-emitter.ts
  function createModEmitter(mods) {
    return (rule, build, lookup) => {
      const modName = rule.args[0].value;
      const mod = mods.find((mod2) => mod2.name === modName);
      if (!mod)
        throw new Error(`mod '${modName}' not found`);
      return mod.emit(rule, build, lookup);
    };
  }
  __name(createModEmitter, "createModEmitter");

  // src/backends/js/utils.ts
  var hexLit = /* @__PURE__ */ __name((n) => `0x${n.toString(16).padStart(2, "0")}`, "hexLit");
  var funcBody = /* @__PURE__ */ __name((text2) => ({ kind: "funcBody", text: text2 }), "funcBody");
  var expr = /* @__PURE__ */ __name((text2) => ({ kind: "expr", text: text2 }), "expr");
  function isEveryRuleOfKind(rules, kind) {
    return rules.every((rule) => rule.kind === kind);
  }
  __name(isEveryRuleOfKind, "isEveryRuleOfKind");
  function emitName(ruleName, build) {
    return build === "parse" ? `ᝍ${ruleName}ᐅ` : `ᐊ${ruleName}ᝍ`;
  }
  __name(emitName, "emitName");
  function emitRef(ref, build) {
    return emitName(ref.name, build);
  }
  __name(emitRef, "emitRef");
  function emitOutsideRangeCond(varName, { min, max }, lowestValue, highestValue) {
    if (min === lowestValue)
      return max === highestValue ? "" : `${varName} > ${hexLit(max)}`;
    if (max === highestValue)
      return `${varName} < ${hexLit(min)}`;
    if (min === max)
      return `${varName} !== ${hexLit(min)}`;
    return `(${varName} < ${hexLit(min)} || ${varName} > ${hexLit(max)})`;
  }
  __name(emitOutsideRangeCond, "emitOutsideRangeCond");

  // src/backends/js/emit-assertion.ts
  var emitAssertion = /* @__PURE__ */ __name((rule, build) => {
    const target = emitRef(rule.args[0], build);
    return funcBody(`
          var IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE;
          var result = ${target}();
          IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ;
          return result;
      `);
  }, "emitAssertion");

  // src/backends/js/emit-byte.ts
  var emitByte = /* @__PURE__ */ __name((rule, build) => {
    const cond = emitOutsideRangeCond("b", rule.args[0], 0, 255);
    switch (build) {
      case "parse":
        return funcBody(`
                  if (IPOS >= ILEN) return false;
                  var b = IN[IPOS];
                  ${cond ? `if (${cond}) return false;` : ""}
                  IPOS += 1;
                  return true;
              `);
      case "print":
        return funcBody(`
                  OUT[OPOS++] = ${hexLit(rule.args[0].min)};
                  return true;
              `);
    }
  }, "emitByte");

  // src/backends/js/emit-char.ts
  var emitChar = /* @__PURE__ */ __name((rule, build) => {
    const cond = emitOutsideRangeCond("cp", rule.args[0], 0, 1114111);
    switch (build) {
      case "parse":
        const cp = rule.args[0].min;
        return funcBody(`
                  OUT[OPOS++] = ${hexLit(cp)};
                  ${cp >= 55296 ? "isFastString = false;" : ""}
                  return true;
              `);
      case "print":
        return funcBody(`
                  if (IPOS >= ILEN) return false;
                  var cp = IN[IPOS];
                  ${cond ? `if (${cond}) return false;` : ""}
                  IPOS += 1;
                  return true;
              `);
    }
  }, "emitChar");

  // src/backends/js/emit-dual.ts
  var emitDual = /* @__PURE__ */ __name((rule, build) => {
    return funcBody(`
          return ${emitRef(rule.args[build === "parse" ? 0 : 1], build)}();
      `);
  }, "emitDual");

  // src/backends/js/emit-field.ts
  var emitField = /* @__PURE__ */ __name((rule, build, lookup) => {
    const label2 = { ref: emitRef(rule.args[0], build), rule: lookup(rule.args[0].name) };
    const value = { ref: emitRef(rule.args[1], build) };
    switch (build) {
      case "parse":
        return funcBody(`
                  var IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE;
                  ${label2.rule.kind === "scalar" ? `
                      OUT[OPOS++] = ${JSON.stringify(label2.rule.args[0].value)};
                  ` : `
                      if (!${label2.ref}()) return false;
                  `}
                  if (!${value.ref}()) return IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ, false;
                  return true;
              `);
      case "print":
        const labelMatchCond = label2.rule.kind === "scalar" ? `IN[IPOS++] === ${JSON.stringify(label2.rule.args[0].value)}` : `${label2.ref}()`;
        return funcBody(`
                  var IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE, i = IPOS;
                  for (var i = IPOS; ; i += 2) {
                      ${""}
                      if (i >= ILEN) return false;
                      IPOS = i;
                      if (${labelMatchCond} && ${value.ref}()) break;
                      IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ;
                  }
                  ${""}
                  if (i === IPOSₒ) return true; else IPOS = IPOSₒ + 2;
                  [IN[IPOSₒ], IN[IPOSₒ + 1], IN[i], IN[i + 1]] = [IN[i], IN[i + 1], IN[IPOSₒ], IN[IPOSₒ + 1]];
                  return true;
              `);
    }
  }, "emitField");

  // src/backends/js/emit-iteration.ts
  var emitIteration = /* @__PURE__ */ __name((rule, build, lookup) => {
    const { min, max } = rule.args[0];
    const target = emitRef(rule.args[1], build);
    const hasMax = max < Number.MAX_SAFE_INTEGER;
    const alwaysConsumes = lookup(rule.args[1].name).meta.isInputConsumed === "all";
    if (min === 0 && max === 1 && alwaysConsumes) {
      return funcBody(`
              return ${target}() || true;
          `);
    }
    if (min === 0 && !hasMax && alwaysConsumes) {
      return funcBody(`
              while (${target}()) ;
              return true;
          `);
    }
    return funcBody(`
          ${min > 1 ? "var IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE;" : ""}
          ${""}
          ${min === 1 ? `
              if (!${target}()) return false;
          ` : ""}
          ${min > 1 && min <= 8 ? `
              if (!(${target}()${` && ${target}()`.repeat(min - 1)})) return IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ, false;
          ` : ""}
          ${min > 8 ? `
              for (var count = ${min}; count; --count) {
                  if (!${target}()) return IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ, false;
              }
          ` : ""}
          ${""}
          ${min === max ? "" : `
              ${hasMax ? `for (${min > 8 ? "" : "var "}count = ${max - min}; count; --count)` : "while (true)"} {
                  ${alwaysConsumes ? `
                      if (!${target}()) return true;
                  ` : `
                      ${min > 1 ? "" : "var "}IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE;
                      if (!${target}() || IPOS === IPOSₒ) return IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ, true;
                  `}
              }
          `}
          ${hasMax ? "return true;" : ""}
      `);
  }, "emitIteration");

  // src/backends/js/emit-leftrec.ts
  var emitLeftrec = /* @__PURE__ */ __name((rule, build, lookup) => {
    const ref = emitRef(rule.args[0], build);
    const refKind = lookup(rule.args[0].name).kind;
    const indirect = refKind !== "selection" && refKind !== "sequence";
    return expr(`createLeftrec(${indirect ? `() => ${ref}()` : ref})`);
  }, "emitLeftrec");

  // src/backends/js/emit-list.ts
  var emitList = /* @__PURE__ */ __name((rule, build) => {
    const ref = emitRef(rule.args[0], build);
    return funcBody(`
          return ${build}List(${ref});
      `);
  }, "emitList");

  // src/backends/js/emit-negation.ts
  var emitNegation = /* @__PURE__ */ __name((rule, build) => {
    const ref = emitRef(rule.args[0], build);
    return funcBody(`
          var IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE;
          var result = !${ref}();
          IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ;
          return result;
      `);
  }, "emitNegation");

  // src/backends/js/emit-record.ts
  var emitRecord = /* @__PURE__ */ __name((rule, build) => {
    const ref = emitRef(rule.args[0], build);
    return funcBody(`
          return ${build}Record(${ref});
      `);
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
    var STATE;
    var isFastString = true;
    var stringCodepoints = new Uint32Array(1);
    var DEFAULT_BUFFER_SIZE = 2 ** 22;
    function $assert(value, message) {
      if (value)
        return;
      throw new Error(`Assertion failed: ${message !== null && message !== void 0 ? message : "no further details"}`);
    }
    __name($assert, "$assert");
    var onReset = [];
    function $parse(stringOrBytes) {
      IN = typeof stringOrBytes === "string" ? stringToUtf8Bytes2(stringOrBytes) : stringOrBytes;
      IPOS = 0, ILEN = IN.length, OUT = [], OPOS = 0;
      STATE = {};
      onReset.forEach((cb) => cb());
      if (!ᝍstartᐅ())
        throw new Error("parse failed");
      if (IPOS !== ILEN)
        throw new Error("parse did not consume entire input");
      if (OPOS !== 1)
        throw new Error("parse did not produce a singular value");
      return OUT[0];
    }
    __name($parse, "$parse");
    function $print(value, outputBytes) {
      IN = [value], IPOS = 0, ILEN = 1;
      OUT = outputBytes ?? new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
      STATE = {};
      onReset.forEach((cb) => cb());
      if (!ᐊstartᝍ())
        throw new Error("print failed");
      if (OPOS > OUT.length)
        throw new Error("output buffer too small");
      return outputBytes ? OPOS : utf8BytesToString(OUT.subarray(0, OPOS));
    }
    __name($print, "$print");
    function parseString(rule) {
      var OPOSₒ = OPOS;
      isFastString = true;
      if (!rule())
        return false;
      if (isFastString && OPOS - OPOSₒ < 65536) {
        OUT[OPOSₒ] = String.fromCharCode.apply(String, OUT.slice(OPOSₒ, OPOS));
      } else {
        for (var str = "", i = OPOSₒ; i < OPOS; i += 65536) {
          str += String.fromCodePoint.apply(String, OUT.slice(i, Math.min(i + 65536, OPOS)));
        }
        OUT[OPOSₒ] = str;
      }
      OPOS = OPOSₒ + 1;
      return true;
    }
    __name(parseString, "parseString");
    function printString(rule) {
      var value = IN[IPOS];
      if (IPOS >= ILEN || typeof value !== "string")
        return false;
      var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
      var vl = value.length;
      if (stringCodepoints.length < vl)
        stringCodepoints = new Uint32Array(vl);
      IN = stringCodepoints, ILEN = 0, IPOS = 0;
      for (var i = 0; i < vl; ++i) {
        var cp = value.charCodeAt(i);
        if ((cp & 64512) === 55296)
          cp = value.codePointAt(i++);
        IN[ILEN++] = cp;
      }
      var result = rule() && IPOS === ILEN;
      IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
      if (result)
        IPOS += 1;
      return result;
    }
    __name(printString, "printString");
    function parseList(rule) {
      var OPOSₒ = OPOS;
      if (!rule())
        return false;
      OUT[OPOSₒ] = OUT.slice(OPOSₒ, OPOS);
      OPOS = OPOSₒ + 1;
      return true;
    }
    __name(parseList, "parseList");
    function printList(rule) {
      var value = IN[IPOS];
      if (IPOS >= ILEN || !Array.isArray(value))
        return false;
      var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
      IN = value, IPOS = 0, ILEN = IN.length;
      var result = rule() && IPOS === ILEN;
      IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
      if (result)
        IPOS += 1;
      return result;
    }
    __name(printList, "printList");
    function parseRecord(rule) {
      var OPOSₒ = OPOS;
      if (!rule())
        return false;
      var obj = {};
      for (var i = OPOSₒ; i < OPOS; i += 2) {
        var label2 = OUT[i];
        $assert(!obj.hasOwnProperty(label2), `Duplicate label '${label2}' in record`);
        obj[label2] = OUT[i + 1];
      }
      OUT[OPOSₒ] = obj;
      OPOS = OPOSₒ + 1;
      return true;
    }
    __name(parseRecord, "parseRecord");
    function printRecord(rule) {
      var value = IN[IPOS];
      if (IPOS >= ILEN || value === null || typeof value !== "object" || Array.isArray(value))
        return false;
      var INₒ = IN, IPOSₒ = IPOS, ILENₒ = ILEN;
      IN = [];
      for (var labels = Object.keys(value), i = 0; i < labels.length; ++i) {
        IN.push(labels[i], value[labels[i]]);
      }
      IPOS = 0, ILEN = IN.length;
      var result = rule() && IPOS === ILEN;
      IN = INₒ, IPOS = IPOSₒ, ILEN = ILENₒ;
      if (result)
        IPOS += 1;
      return result;
    }
    __name(printRecord, "printRecord");
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
      return true;
    }
    __name(parseUtf8Float, "parseUtf8Float");
    function printUtf8Float() {
      var num = IN[IPOS];
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
        return true;
      }, "parseUtf8Int");
    }
    __name(createUtf8IntParser, "createUtf8IntParser");
    function createUtf8IntPrinter({ base, signed }) {
      $assert(typeof base === "number" && base >= 2 && base <= 36);
      $assert(typeof signed === "boolean");
      return /* @__PURE__ */ __name(function printUtf8Int() {
        var num = IN[IPOS];
        if (typeof num !== "number")
          return false;
        var isNegative = false;
        var MAX_NUM = 2147483647;
        if (num < 0) {
          if (!signed)
            return false;
          isNegative = true;
          num = -num;
          MAX_NUM = 2147483648;
        }
        if (num > MAX_NUM)
          return false;
        var digits = [];
        while (true) {
          var d2 = num % base;
          num = num / base | 0;
          digits.push(CHAR_CODES[d2]);
          if (num === 0)
            break;
        }
        IPOS += 1;
        if (isNegative)
          OUT[OPOS++] = HYPHEN;
        for (var i = digits.length; i > 0; ) {
          OUT[OPOS++] = digits[--i];
        }
        return true;
      }, "printUtf8Int");
    }
    __name(createUtf8IntPrinter, "createUtf8IntPrinter");
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
        if (cp >= 55296)
          isFastString = false;
        return true;
      }, "parseUtf8Codepoint");
    }
    __name(createUtf8UecharParser, "createUtf8UecharParser");
    function createUtf8UecharPrinter({ base, minlen, maxlen }) {
      $assert(typeof base === "number" && base >= 2 && base <= 36);
      $assert(typeof minlen === "number" && minlen >= 1 && minlen <= 8);
      $assert(typeof maxlen === "number" && maxlen >= minlen && maxlen <= 8);
      return /* @__PURE__ */ __name(function printUtf8Codepoint() {
        if (IPOS >= ILEN)
          return false;
        var cp = IN[IPOS];
        var s = cp.toString(base).padStart(minlen, "0");
        if (s.length > maxlen)
          return false;
        for (var char of s)
          OUT[OPOS++] = char.charCodeAt(0);
        return true;
      }, "printUtf8Codepoint");
    }
    __name(createUtf8UecharPrinter, "createUtf8UecharPrinter");
    function createLeftrec(rule) {
      var saved;
      return /* @__PURE__ */ __name(function leftrec() {
        if (saved?.IN === IN && saved.IPOS === IPOS) {
          IPOS += saved.ΔIPOS;
          for (var i = 0; i < saved.ΔOUT.length; ++i)
            OUT[OPOS++] = saved.ΔOUT[i];
          return saved.result;
        }
        var savedₒ = saved, result = false;
        saved = { IN, IPOS, result, ΔIPOS: 0, ΔOUT: [] };
        var IPOSₒ = IPOS, OPOSₒ = OPOS;
        while (true) {
          IPOS = IPOSₒ, OPOS = OPOSₒ;
          result = rule();
          var isFirstIteration = !saved.result;
          var isMoreInputConsumedThanPreviousIteration = IPOS - IPOSₒ > saved.ΔIPOS;
          if (result && (isFirstIteration || isMoreInputConsumedThanPreviousIteration)) {
            saved.result = result;
            saved.ΔIPOS = IPOS - IPOSₒ;
            saved.ΔOUT = OUT.slice(OPOSₒ, OPOS);
            continue;
          }
          IPOS = IPOSₒ, OPOS = OPOSₒ;
          leftrec();
          saved = savedₒ;
          return result;
        }
      }, "leftrec");
    }
    __name(createLeftrec, "createLeftrec");
    function stringToUtf8Bytes2(s) {
      OUT = new Uint8Array(DEFAULT_BUFFER_SIZE), OPOS = 0;
      for (var char of s)
        writeUtf8Codepoint(char.codePointAt(0));
      if (OPOS > OUT.length)
        throw new Error("input buffer too small");
      return OUT.subarray(0, OPOS);
    }
    __name(stringToUtf8Bytes2, "stringToUtf8Bytes");
    function utf8BytesToString(b) {
      IN = b, IPOS = 0, ILEN = b.length;
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
    __name(utf8BytesToString, "utf8BytesToString");
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
    "$END$";
    function sourceCodeBetweenStartAndEndDelimiters() {
      const funcBody2 = emitRuntimeLibrary.toString();
      const matches = /([ ]*)['"][$]START[$]['"]([^]*)['"][$]END[$]['"]/.exec(funcBody2);
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
      STATE,
      $parse,
      $print,
      parseString,
      printString,
      parseList,
      printList,
      parseRecord,
      printRecord,
      parseUtf8Float,
      printUtf8Float,
      createUtf8IntParser,
      createUtf8IntPrinter,
      createUtf8UecharParser,
      createUtf8UecharPrinter,
      createLeftrec
    ];
    return "";
  }
  __name(emitRuntimeLibrary, "emitRuntimeLibrary");

  // src/backends/js/emit-scalar.ts
  var emitScalar = /* @__PURE__ */ __name((rule, build) => {
    const val = rule.args[0].value;
    switch (build) {
      case "parse":
        return funcBody(`
                  OUT[OPOS++] = ${JSON.stringify(val)};
                  return true;
              `);
      case "print":
        return funcBody(`
                  if (IPOS >= ILEN) return false;
                  if (IN[IPOS] !== ${JSON.stringify(val)}) return false;
                  IPOS += 1;
                  return true;
              `);
    }
  }, "emitScalar");

  // src/backends/js/emit-selection.ts
  var emitSelection = /* @__PURE__ */ __name((rule, build, lookup) => {
    const items = rule.args.map((ref) => lookup(ref.name));
    if (items.length === 0)
      return emitNeverMatch();
    if (isEveryRuleOfKind(items, "byte"))
      return emitByteSelection(items, build);
    if (isEveryRuleOfKind(items, "char"))
      return emitCharSelection(items, build);
    if (isEveryRuleOfKind(items, "utf8.char"))
      return emitCharSelection(items, build);
    const refs = rule.args.map((ref) => emitRef(ref, build));
    return funcBody(`
          return ${refs.map((ref) => `${ref}()`).join(" || ")};
      `);
  }, "emitSelection");
  function emitNeverMatch() {
    return funcBody(`
          return false;
      `);
  }
  __name(emitNeverMatch, "emitNeverMatch");
  function emitByteSelection(items, build) {
    switch (build) {
      case "parse": {
        const cond = items.map(({ args: [arg] }) => emitOutsideRangeCond("b", arg, 0, 255)).filter((cond2) => !!cond2).join(" && ");
        const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n") || "?").join(" | ").trim();
        return funcBody(`
                  if (IPOS >= ILEN) return false;
                  var b = IN[IPOS];
                  ${comment ? ` // ${comment}` : ""}
                  ${cond ? `if (${cond}) return false;` : ""}
                  IPOS += 1;
                  return true;
              `);
      }
      case "print": {
        const b = items[0].args[0].min;
        const comment = items[0].meta.note.replace(/[\r\n]/g, "\\n");
        return funcBody(`
                  OUT[OPOS++] = ${hexLit(b)};${comment ? ` // ${comment}` : ""}
                  return true;
              `);
      }
    }
  }
  __name(emitByteSelection, "emitByteSelection");
  function emitCharSelection(items, build) {
    const kind = items[0].kind;
    const args = items.map((item) => item.args);
    const defaultCp = args[0][0].min;
    const hasOutput = kind === "utf8.char" || kind === "char" && build === "parse";
    const cond = args.map(([arg]) => emitOutsideRangeCond("cp", arg, 0, 1114111)).filter((cond2) => !!cond2).join(" && ");
    const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n") || "?").join(" | ").trim();
    const isAscii = args.every(([arg]) => arg.max < 128);
    switch (build) {
      case "parse":
        return funcBody(`
                  ${kind === "utf8.char" ? `
                      ${cond ? "var IPOSₒ = IPOS;" : ""}
                      var cp = readUtf8Codepoint();
                      if (cp === -1) return false;
                  ` : ""}
                  ${comment ? ` // ${comment}` : ""}
                  ${kind === "utf8.char" && cond ? `if (${cond}) return IPOS = IPOSₒ, false;` : ""}
                  OUT[OPOS++] = ${kind === "char" ? hexLit(defaultCp) : "cp"};
                  ${isAscii || kind === "char" ? "" : "isFastString = false;"}
                  ${!isAscii && kind !== "char" ? "if (cp >= 0xd800) isFastString = false;" : ""}
                  return true;
              `);
      case "print":
        return funcBody(`
                  if (IPOS >= ILEN) return false;
                  var cp = IN[IPOS];
                  ${comment ? ` // ${comment}` : ""}
                  ${cond ? `if (${cond}) return false;` : ""}
                  ${hasOutput ? isAscii ? `OUT[OPOS++] = cp;` : `writeUtf8Codepoint(cp);` : ""}
                  IPOS += 1;
                  return true;
              `);
    }
  }
  __name(emitCharSelection, "emitCharSelection");

  // src/backends/js/emit-sequence.ts
  var emitSequence = /* @__PURE__ */ __name((rule, build, lookup) => {
    const items = rule.args.map((ref) => lookup(ref.name));
    if (items.length === 0)
      return emitAlwaysMatch();
    if (isEveryRuleOfKind(items, "byte"))
      return emitByteSequence(items, build);
    if (isEveryRuleOfKind(items, "char"))
      return emitCharSequence(items, build);
    if (isEveryRuleOfKind(items, "utf8.char") && items.every((i) => i.args[0].min === i.args[0].max)) {
      return emitUtf8String(items, build);
    }
    const refs = rule.args.map((ref) => emitRef(ref, build));
    return funcBody(`
          var IPOSₒ = IPOS, OPOSₒ = OPOS, STATEₒ = STATE;
          if (${refs.map((ref) => `${ref}()`).join(" && ")}) return true;
          IPOS = IPOSₒ, OPOS = OPOSₒ, STATE = STATEₒ;
          return false;
      `);
  }, "emitSequence");
  function emitAlwaysMatch() {
    return funcBody(`
          return true;
      `);
  }
  __name(emitAlwaysMatch, "emitAlwaysMatch");
  function emitByteSequence(items, build) {
    switch (build) {
      case "parse":
        const body = items.map(({ args: [arg], meta: { note } }, i) => {
          if (arg.min === 0 && arg.max === 255)
            return "";
          const byteRef = `IN[IPOS${i > 0 ? ` + ${i}` : ""}]`;
          const comment2 = note ? ` // ${note.replace(/[\r\n]/g, "\\n")}` : "";
          return `if (${emitOutsideRangeCond(byteRef, arg, 0, 255)}) return false;${comment2}`;
        }).filter((cond) => !!cond).join("\n");
        return funcBody(`
                  if (IPOS + ${items.length} > ILEN) return false;
                  ${body}
                  IPOS += ${items.length};
                  return true;
              `);
      case "print":
        const bytes = items.map(({ args: [arg] }) => arg.min);
        const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n")).join(" ").trim();
        return funcBody(`
                  ${comment ? ` // ${comment}
  ` : ""}
                  ${bytes.map((byte) => `
                      OUT[OPOS++] = ${hexLit(byte)};
                  `).join("")}
                  return true;
              `);
    }
  }
  __name(emitByteSequence, "emitByteSequence");
  function emitCharSequence(items, build) {
    switch (build) {
      case "parse":
        const cps = items.map(({ args: [arg] }) => arg.min);
        const comment = items.map(({ meta: { note } }) => note.replace(/[\r\n]/g, "\\n")).join(" ").trim();
        return funcBody(`
                  ${comment ? ` // ${comment}
  ` : ""}
                  ${cps.map((cp) => `
                      OUT[OPOS++] = ${hexLit(cp)};
                  `).join("")}
                  return true;
              `);
      case "print":
        const body = items.map(({ args: [arg], meta: { note } }, i) => {
          if (arg.min === 0 && arg.max === 1114111)
            return "";
          const cpRef = `IN[IPOS${i > 0 ? ` + ${i}` : ""}]`;
          const comment2 = note ? ` // ${note.replace(/[\r\n]/g, "\\n")}` : "";
          return `if (${emitOutsideRangeCond(cpRef, arg, 0, 1114111)}) return false;${comment2}`;
        }).filter((cond) => !!cond).join("\n");
        return funcBody(`
                  if (IPOS + ${items.length} > ILEN) return false;
                  ${body}
                  IPOS += ${items.length};
                  return true;
              `);
    }
  }
  __name(emitCharSequence, "emitCharSequence");
  function emitUtf8String(items, build) {
    const codepoints = [];
    for (var { args: [arg] } of items)
      codepoints.push(arg.min);
    const len = codepoints.length;
    const isAscii = codepoints.map((cp) => cp < 128);
    switch (build) {
      case "parse":
        return funcBody(`
                  ${len > 0 ? `
                      var IPOSₒ = IPOS;
                      ${codepoints.map((cp) => `
                          if (readUtf8Codepoint() !== ${hexLit(cp)}) return IPOS = IPOSₒ, false;
                      `).join("")}
                      ${codepoints.map((cp) => `
                          OUT[OPOS++] = ${hexLit(cp)};
                      `).join("")}
                  ` : ""}
                  ${codepoints.every((cp) => cp < 55296) ? "" : "isFastString = false;"}
                  return true;
              `);
      case "print":
        return funcBody(`
                  ${len > 0 ? `
                      if (IPOS${len > 0 ? ` + ${len}` : ""} > ILEN) return false;
                      ${codepoints.map((cp, i) => `
                          if (IN[IPOS${i > 0 ? ` + ${i}` : ""}] !== ${hexLit(cp)}) return false;
                      `).join("")}
                      IPOS += ${len};
                      ${codepoints.map((cp, i) => `
                          ${isAscii[i] ? `OUT[OPOS++] = ${hexLit(cp)};` : `writeUtf8Codepoint(${hexLit(cp)});`}
                      `).join("")}
                  ` : ""}
                  return true;
              `);
    }
  }
  __name(emitUtf8String, "emitUtf8String");

  // src/backends/js/emit-string.ts
  var emitString = /* @__PURE__ */ __name((rule, build) => {
    const ref = emitRef(rule.args[0], build);
    return funcBody(`
          return ${build}String(${ref});
      `);
  }, "emitString");

  // src/backends/js/emit-utf8-char.ts
  var emitUtf8Char = /* @__PURE__ */ __name((rule, build) => {
    const cond = emitOutsideRangeCond("cp", rule.args[0], 0, 1114111);
    const { min, max } = rule.args[0];
    const isExactCond = cond && min === max;
    const isAscii = max < 128;
    switch (build) {
      case "parse":
        return funcBody(`
                  ${cond ? "var IPOSₒ = IPOS;" : ""}
                  ${isExactCond ? `
                      if (${cond.replace("cp", "readUtf8Codepoint()")}) return IPOS = IPOSₒ, false;
                  ` : `
                      var cp = readUtf8Codepoint();
                      if (cp === -1) return false;
                      ${cond ? `if (${cond}) return IPOS = IPOSₒ, false;` : ""}
                  `}
                  OUT[OPOS++] = ${isExactCond ? `${hexLit(min)}` : "cp"};
                  ${isAscii ? "" : (isExactCond ? "" : "if (cp >= 0xd800) ") + (isExactCond && min < 55296 ? "" : "isFastString = false;")}
                  return true;
              `);
      case "print":
        return funcBody(`
                  if (IPOS >= ILEN) return false;
                  var cp = IN[IPOS];
                  ${cond ? `if (${cond}) return false;` : ""}
                  IPOS += 1;
                  ${isAscii ? `OUT[OPOS++] = cp;` : `writeUtf8Codepoint(cp);`}
                  return true;
              `);
    }
  }, "emitUtf8Char");

  // src/backends/js/emit-utf8-float.ts
  var emitUtf8Float = /* @__PURE__ */ __name((_rule, build) => {
    const helperName = build === "parse" ? "parseUtf8Float" : "printUtf8Float";
    return expr(helperName);
  }, "emitUtf8Float");

  // src/backends/js/emit-utf8-int.ts
  var emitUtf8Int = /* @__PURE__ */ __name((rule, build) => {
    const [{ base, signed }] = rule.args;
    const helperName = build === "parse" ? "createUtf8IntParser" : "createUtf8IntPrinter";
    return expr(`${helperName}({base: ${base}, signed: ${signed}})`);
  }, "emitUtf8Int");

  // src/backends/js/emit-utf8-uechar.ts
  var emitUtf8UnicodeEscapedChar = /* @__PURE__ */ __name((rule, build) => {
    const [{ base, minlen, maxlen }] = rule.args;
    const helperName = build === "parse" ? "createUtf8UecharParser" : "createUtf8UecharPrinter";
    return expr(`${helperName}({base: ${base}, minlen: ${minlen}, maxlen: ${maxlen}})`);
  }, "emitUtf8UnicodeEscapedChar");

  // src/backends/js/pil-to-js.ts
  function pilToJs(pil, options2) {
    const mods = options2?.mods ?? [];
    const build = options2?.build ?? "parse";
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
    const { prolog, epilog } = emitWrapper(build, options2?.flavour ?? "cjs");
    out.write(prolog);
    out.write("\n\n\n\n\n", `// ------------------------------ Runtime ------------------------------`);
    const runtimeLibrarySource = emitRuntimeLibrary();
    runtimeLibrarySource.split(/[\r\n]+/).filter((line) => !isElidable(line)).forEach((line) => out.write("\n", line));
    out.write("\n\n\n\n\n", `// ------------------------------ Rules ------------------------------`);
    emitRules({ pil, build, isElidable, write: out.write, mods });
    out.write("\n\n\n\n\n", epilog, "\n");
    return out.build();
  }
  __name(pilToJs, "pilToJs");
  function emitWrapper(build, flavour) {
    switch (flavour) {
      case "cjs":
        return {
          prolog: `((function(m) {`,
          epilog: `m.exports = ${build === "parse" ? "$parse" : "$print"}; })(module))`
        };
      case "iife":
        return {
          // TODO: ...
          prolog: `((function () {`,
          epilog: `return ${build === "parse" ? "$parse" : "$print"}; })())`
        };
    }
  }
  __name(emitWrapper, "emitWrapper");
  function emitRules({ pil, build, isElidable, write, mods }) {
    const startRuleName = "start";
    let rules = pil.rules;
    const entries = Object.entries(rules);
    rules = {};
    for (let [name, rule] of entries) {
      if (rule.meta.isLeftCycleHead) {
        const origName = name;
        for (let i = 1; rules.hasOwnProperty(name = origName + "ᐟ".repeat(i)); ++i)
          ;
        rules[origName] = { kind: "leftrec", args: [{ kind: "Ref", name }], meta: rule.meta };
      }
      rules[name] = rule;
    }
    const lookup = /* @__PURE__ */ __name((ruleName) => {
      const rule = rules[ruleName];
      if (!rule)
        throw new Error(`Rule ${JSON.stringify(ruleName)} not found`);
      return rule;
    }, "lookup");
    const emitMod = createModEmitter(mods);
    const getCodeForRule = memoise(() => (rule) => {
      switch (rule.kind) {
        case "assertion":
          return emitAssertion(rule, build, lookup);
        case "byte":
          return emitByte(rule, build, lookup);
        case "char":
          return emitChar(rule, build, lookup);
        case "dual":
          return emitDual(rule, build, lookup);
        case "field":
          return emitField(rule, build, lookup);
        case "iteration":
          return emitIteration(rule, build, lookup);
        case "leftrec":
          return emitLeftrec(rule, build, lookup);
        case "list":
          return emitList(rule, build, lookup);
        case "negation":
          return emitNegation(rule, build, lookup);
        case "record":
          return emitRecord(rule, build, lookup);
        case "scalar":
          return emitScalar(rule, build, lookup);
        case "selection":
          return emitSelection(rule, build, lookup);
        case "sequence":
          return emitSequence(rule, build, lookup);
        case "string":
          return emitString(rule, build, lookup);
        case "utf8.char":
          return emitUtf8Char(rule, build, lookup);
        case "utf8.float":
          return emitUtf8Float(rule, build, lookup);
        case "utf8.int":
          return emitUtf8Int(rule, build, lookup);
        case "utf8.uechar":
          return emitUtf8UnicodeEscapedChar(rule, build, lookup);
        case "mod":
          return emitMod(rule, build, lookup);
        default:
          ((rule2) => {
            throw new Error(`unrecognised kind '${rule2.kind}'`);
          })(rule);
      }
    });
    const reachableRuleNames = (/* @__PURE__ */ new Set()).add(startRuleName);
    for (const ruleName of reachableRuleNames) {
      const rule = rules[ruleName];
      const code = getCodeForRule(rule);
      for (const arg of rule.args) {
        if (!arg || typeof arg !== "object" || arg.kind !== "Ref")
          continue;
        const referencedRuleName = arg.name;
        if (reachableRuleNames.has(referencedRuleName))
          continue;
        const searchText = emitName(referencedRuleName, build);
        if (code.text.includes(searchText))
          reachableRuleNames.add(referencedRuleName);
      }
    }
    for (const ruleName in rules) {
      if (!reachableRuleNames.has(ruleName))
        continue;
      const note = rules[ruleName].meta.note;
      if (note) {
        write("\n");
        note.split(/[\r\n]+/).forEach((line) => {
          if (!line.trim())
            return;
          write("\n// ", line);
        });
      }
      const code = getCodeForRule(rules[ruleName]);
      const ruleDecl = code.kind === "expr" ? `
              var ${emitName(ruleName, build)} = ${code.text};
          ` : `
              function ${emitName(ruleName, build)}() {
                  ${code.text}
              }
          `;
      const lines = ruleDecl.split(/\r\n|\r|\n/).map((line) => line.trim()).filter((line) => line.length);
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

  // src/midend/analyse/check-types.ts
  function checkTypes(pil, mods = []) {
    let types;
    let errors;
    let seedTypes = /* @__PURE__ */ new Map();
    while (true) {
      types = /* @__PURE__ */ new Map();
      errors = [];
      const checkRuleType = createChecker(pil, mods, seedTypes, errors);
      for (const ruleName of Object.keys(pil.rules)) {
        const type = checkRuleType(ruleName, ruleName === "start" ? "value" : "any");
        types.set(ruleName, type);
      }
      if (seedTypes.size === types.size) {
        const entries = Array.from(seedTypes.entries());
        if (entries.every(([k, v]) => types.get(k) === (v ?? "nothing")))
          break;
      }
      seedTypes = types;
    }
    const newPil = { rules: {} };
    for (const [name, rule] of Object.entries(pil.rules)) {
      newPil.rules[name] = { ...rule, meta: { ...rule.meta, type: types.get(name) } };
    }
    return { types, errors };
  }
  __name(checkTypes, "checkTypes");
  function createChecker(pil, mods, seedTypes, errors) {
    let predicateAffinity;
    const check = /* @__PURE__ */ __name((ruleName, constraint) => checkMemoised(`${ruleName}:${constraint}`), "check");
    const checkMemoised = memoise((memos) => (ruleNameColonConstraint) => {
      const [ruleName, constraint] = ruleNameColonConstraint.split(":");
      const isValueRequired = constraint === "value" || constraint === "string";
      const isValueAllowed = isValueRequired || constraint === "value*" || constraint === "any";
      memos.set(ruleNameColonConstraint, seedTypes.get(ruleName) ?? "nothing");
      const rule = pil.rules[ruleName];
      switch (rule.kind) {
        case "byte": {
          if (isValueRequired)
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          return "nothing";
        }
        case "assertion":
        case "negation": {
          if (isValueRequired)
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          else
            check(rule.args[0].name, predicateAffinity ?? constraint);
          return "nothing";
        }
        case "char":
        case "utf8.char":
        case "utf8.uechar": {
          if (constraint !== "char*" && constraint !== "any")
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          return "char*";
        }
        case "dual": {
          const t1 = check(rule.args[0].name, constraint);
          const t2 = check(rule.args[1].name, constraint);
          if (t1 !== t2)
            errors.push(`Rule ${ruleName}: expected parse and print types to match`);
          return t1;
        }
        case "field": {
          if (constraint !== "field*" && constraint !== "any")
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          check(rule.args[0].name, "string");
          check(rule.args[1].name, "value");
          return "field*";
        }
        case "string": {
          if (!isValueAllowed)
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          check(rule.args[0].name, "char*");
          return "string";
        }
        case "list": {
          if (!isValueAllowed || constraint === "string")
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          check(rule.args[0].name, "value*");
          return "value";
        }
        case "record": {
          if (!isValueAllowed || constraint === "string")
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          check(rule.args[0].name, "field*");
          return "value";
        }
        case "scalar": {
          const isString = typeof rule.args[0].value === "string";
          if (!isValueAllowed || constraint === "string" && !isString)
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          return isString ? "string" : "value";
        }
        case "utf8.float":
        case "utf8.int": {
          if (!isValueAllowed || constraint === "string")
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          return "value";
        }
        case "iteration": {
          if (isValueRequired)
            errors.push(`Rule ${ruleName}: expected ${constraint}`);
          const t = check(rule.args[1].name, constraint);
          return t === "value" || t === "string" ? "value*" : t;
        }
        case "selection": {
          let t = "nothing";
          let isOptional = false;
          for (const ref of rule.args) {
            const c2 = check(ref.name, constraint);
            if (c2 === "nothing")
              isOptional = true;
            else
              t = c2;
          }
          if (!isOptional)
            return t;
          if (t === "value" || t === "string")
            return "value*";
          return t;
        }
        case "sequence": {
          const predicateAffinityₒ = predicateAffinity;
          predicateAffinity = constraint;
          const nothingItems = rule.args.filter((ref) => check(ref.name, "any") === "nothing");
          predicateAffinity = predicateAffinityₒ;
          const valueItems = rule.args.filter((ref) => !nothingItems.includes(ref));
          if (isValueRequired && valueItems.length !== 1)
            errors?.push(`Rule '${ruleName}': expected ${constraint}`);
          const valueTypes = valueItems.map((ref) => check(ref.name, constraint));
          if (valueItems.length === 0)
            return "nothing";
          if (valueTypes.length === 1)
            return valueTypes[0];
          return valueTypes[0].endsWith("*") ? valueTypes[0] : "value*";
        }
        case "mod": {
          const modName = rule.args[0].value;
          const mod = mods.find((mod2) => mod2.name === modName);
          if (!mod)
            throw new Error(`mod '${modName}' not found`);
          return mod.checkType(constraint, check);
        }
        default: {
          ((r) => {
            throw new Error(`Unhandled rule kind '${r.kind}'`);
          })(rule);
        }
      }
    });
    return check;
  }
  __name(createChecker, "createChecker");

  // src/midend/analyse/analyse-input-consumption.ts
  function analyseInputConsumption({ pil, build, mods = [] }) {
    const isInputConsumed = memoise((memos) => (ruleName) => {
      memos.set(ruleName, "some");
      const rule = pil.rules[ruleName];
      switch (rule.kind) {
        case "assertion":
        case "negation":
          return "none";
        case "utf8.char":
        case "utf8.float":
        case "utf8.int":
        case "utf8.uechar":
          return "all";
        case "byte":
          return build === "parse" ? "all" : "none";
        case "char":
        case "scalar":
          return build === "parse" ? "none" : "all";
        case "dual": {
          return isInputConsumed(rule.args[build === "parse" ? 0 : 1].name);
        }
        case "field": {
          if (build === "print")
            return "all";
          const itemQuantifiers = rule.args.map((ref) => isInputConsumed(ref.name));
          if (itemQuantifiers.some((quantifier) => quantifier === "all"))
            return "all";
          if (itemQuantifiers.every((quantifier) => quantifier === "none"))
            return "none";
          return "some";
        }
        case "string":
        case "list":
        case "record": {
          if (build === "print")
            return "all";
          return isInputConsumed(rule.args[0].name);
        }
        case "iteration": {
          const [range2, ref] = rule.args;
          const itemQuantifier = isInputConsumed(ref.name);
          if (range2.min > 0 && itemQuantifier === "all")
            return "all";
          if (range2.max === 0 || itemQuantifier === "none")
            return "none";
          return "some";
        }
        case "sequence": {
          const itemQuantifiers = rule.args.map((ref) => isInputConsumed(ref.name));
          if (itemQuantifiers.some((quantifier) => quantifier === "all"))
            return "all";
          if (itemQuantifiers.every((quantifier) => quantifier === "none"))
            return "none";
          return "some";
        }
        case "selection": {
          const itemQuantifiers = rule.args.map((ref) => isInputConsumed(ref.name));
          if (itemQuantifiers.every((quantifier) => quantifier === "all"))
            return "all";
          if (itemQuantifiers.every((quantifier) => quantifier === "none"))
            return "none";
          return "some";
        }
        case "mod": {
          const modName = rule.args[0].value;
          const mod = mods.find((mod2) => mod2.name === modName);
          if (!mod)
            throw new Error(`mod '${modName}' not found`);
          return mod.isInputConsumed(build, isInputConsumed);
        }
      }
    });
    return { isInputConsumed };
  }
  __name(analyseInputConsumption, "analyseInputConsumption");

  // src/midend/analyse/find-left-recursive-head-rules.ts
  function findLeftRecursiveHeadRules({ pil, build, isInputConsumed, mods = [] }) {
    const leftRecursiveHeads = /* @__PURE__ */ new Set();
    const visited = /* @__PURE__ */ new Set();
    const path = [];
    for (const ruleName of Object.keys(pil.rules)) {
      if (visited.has(ruleName))
        continue;
      path.length = 0;
      path.push(ruleName);
      traverse2();
    }
    function traverse2() {
      const adjacents = getDirectlyRefdRulesReachableAtSameInputPosition(path.at(-1));
      for (let adjacent of adjacents) {
        const ix = path.indexOf(adjacent);
        if (ix === -1) {
          path.push(adjacent);
          traverse2();
          path.pop();
        } else {
          leftRecursiveHeads.add(adjacent);
        }
      }
    }
    __name(traverse2, "traverse");
    return leftRecursiveHeads;
    function getDirectlyRefdRulesReachableAtSameInputPosition(ruleName) {
      visited.add(ruleName);
      const rule = pil.rules[ruleName];
      switch (rule.kind) {
        case "byte":
        case "char":
        case "scalar":
        case "utf8.char":
        case "utf8.float":
        case "utf8.int":
        case "utf8.uechar":
          return [];
        case "assertion":
        case "negation":
          return [rule.args[0].name];
        case "dual": {
          return [rule.args[build === "parse" ? 0 : 1].name];
        }
        case "field": {
          if (build === "print")
            return [];
          const result = [rule.args[0].name];
          if (isInputConsumed(rule.args[0].name) !== "all")
            result.push(rule.args[1].name);
          return result;
        }
        case "string":
        case "list":
        case "record": {
          return build === "parse" ? [rule.args[0].name] : [];
        }
        case "iteration": {
          const [range2, ref] = rule.args;
          return range2.max > 0 ? [ref.name] : [];
        }
        case "sequence": {
          const result = [];
          for (const ref of rule.args) {
            result.push(ref.name);
            if (isInputConsumed(ref.name) === "all")
              break;
          }
          return result;
        }
        case "selection":
          return rule.args.map(({ name }) => name);
        case "mod": {
          const modName = rule.args[0].value;
          const mod = mods.find((mod2) => mod2.name === modName);
          if (!mod)
            throw new Error(`mod '${modName}' not found`);
          return mod.getDirectlyRefdRulesReachableAtSameInputPosition(isInputConsumed);
        }
      }
    }
    __name(getDirectlyRefdRulesReachableAtSameInputPosition, "getDirectlyRefdRulesReachableAtSameInputPosition");
  }
  __name(findLeftRecursiveHeadRules, "findLeftRecursiveHeadRules");

  // src/midend/analyse/analyse.ts
  function analyse(pil, build, mods = []) {
    const { isInputConsumed } = analyseInputConsumption({ pil, build, mods });
    const leftRecursiveHeadRules = findLeftRecursiveHeadRules({ pil, build, isInputConsumed, mods });
    const { types, errors } = checkTypes(pil, mods);
    const newPil = { rules: {} };
    for (const [ruleName, { kind, args, meta }] of Object.entries(pil.rules)) {
      newPil.rules[ruleName] = {
        kind,
        args,
        meta: {
          ...meta,
          type: types.get(ruleName),
          isInputConsumed: isInputConsumed(ruleName),
          isLeftCycleHead: leftRecursiveHeadRules.has(ruleName)
        }
      };
    }
    return { pil: newPil, errors };
  }
  __name(analyse, "analyse");

  // src/midend/pil/index.ts
  var import_pil = __toESM(require_pil());

  // src/midend/pil/validate.ts
  function validate(pil) {
    let errors = [];
    if (!pil.rules.start)
      errors.push(`Program must have a 'start' rule`);
    for (const [ruleName, rule] of Object.entries(pil.rules)) {
      for (const arg of rule.args) {
        if (arg.kind !== "Ref")
          continue;
        if (!!pil.rules[arg.name])
          continue;
        errors.push(`Rule ${ruleName}: Referenced rule '${arg.name}' must be defined in the program`);
      }
      switch (rule.kind) {
        case "byte": {
          const { min: min2, max: max2 } = rule.args[0];
          if (min2 < 0 || max2 > 255)
            errors.push(`Rule ${ruleName}: byte must be in range 0x00..0xFF`);
          break;
        }
        case "char":
        case "utf8.char": {
          const { min: min2, max: max2 } = rule.args[0];
          if (min2 < 0 || max2 > 1114111)
            errors.push(`Rule ${ruleName}: char must be in range 0x00..0x10FFFF`);
          break;
        }
        case "iteration":
          const { min, max } = rule.args[0];
          if (min < 0 || max > ITERATION_MAX)
            throw new Error(`Rule ${ruleName}: iteration must be in range 0..${ITERATION_MAX}`);
          break;
      }
    }
    return { errors };
  }
  __name(validate, "validate");
  var ITERATION_MAX = Number.MAX_SAFE_INTEGER;

  // src/midend/pil-mods/indent-dec.ts
  var indentDec = {
    name: "indent-dec",
    checkType(_constraint, _recurse) {
      return "nothing";
    },
    isInputConsumed() {
      return "none";
    },
    getDirectlyRefdRulesReachableAtSameInputPosition(_isInputConsumed) {
      return [];
    },
    emit(_rule, _build, _lookup) {
      return {
        kind: "funcBody",
        text: `
                  var indent = (STATE.indent ?? 0) - 1;
                  STATE = {...STATE, indent};
                  return true;
              `
      };
    }
  };

  // src/midend/pil-mods/indent-inc.ts
  var indentInc = {
    name: "indent-inc",
    checkType(_constraint, _recurse) {
      return "nothing";
    },
    isInputConsumed() {
      return "none";
    },
    getDirectlyRefdRulesReachableAtSameInputPosition(_isInputConsumed) {
      return [];
    },
    emit(_rule, _build, _lookup) {
      return {
        kind: "funcBody",
        text: `
                  var indent = (STATE.indent ?? 0) + 1;
                  STATE = {...STATE, indent};
                  return true;
              `
      };
    }
  };

  // src/midend/pil-mods/indent-tab.ts
  var indentTab = {
    name: "indent-tab",
    // TODO: this name is bad - improve it...
    checkType(_constraint, _recurse) {
      return "nothing";
    },
    isInputConsumed(build) {
      return build === "parse" ? "some" : "none";
    },
    getDirectlyRefdRulesReachableAtSameInputPosition(_isInputConsumed) {
      return [];
    },
    emit(_rule, build, _lookup) {
      switch (build) {
        case "parse":
          return {
            kind: "funcBody",
            text: `
                          var count = (STATE.indent ?? 0) * 4;
                          if (IPOS + count > ILEN) return false;
                          for (var i = 0; i < count; ++i) {
                              if (IN[IPOS + i] !== 0x20) return false;
                          }
                          IPOS += count;
                          return true;
                      `
          };
        case "print":
          return {
            kind: "funcBody",
            text: `
                          var count = (STATE.indent ?? 0) * 4;
                          for (var i = 0; i < count; ++i) {
                              OUT[OPOS++] = 0x20;
                          }
                          return true;
                      `
          };
      }
    }
  };

  // src/midend/pil-mods/is-parse.ts
  var isParse = {
    name: "is.parse",
    checkType(_constraint, _recurse) {
      return "nothing";
    },
    isInputConsumed() {
      return "none";
    },
    getDirectlyRefdRulesReachableAtSameInputPosition(_isInputConsumed) {
      return [];
    },
    emit(_rule, mode, _lookup) {
      return {
        kind: "funcBody",
        text: `
                  return ${mode === "parse"};
              `
      };
    }
  };

  // src/midend/pil-mods/is-print.ts
  var isPrint = {
    name: "is.print",
    checkType(_constraint, _recurse) {
      return "nothing";
    },
    isInputConsumed() {
      return "none";
    },
    getDirectlyRefdRulesReachableAtSameInputPosition(_epsilonDerivingRules) {
      return [];
    },
    emit(_rule, mode, _lookup) {
      return {
        kind: "funcBody",
        text: `
                  return ${mode === "print"};
              `
      };
    }
  };

  // src/midend/pil-mods/index.ts
  var pilMods = [indentDec, indentInc, indentTab, isParse, isPrint];

  // src/backends/text.ts
  function pilToText(pil) {
    const simplePil = { rules: {} };
    for (const [ruleName, { kind, args, meta }] of Object.entries(pil.rules)) {
      simplePil.rules[ruleName] = { kind, args, meta: { note: meta.note } };
    }
    return (0, import_pil.print)(simplePil);
  }
  __name(pilToText, "pilToText");

  // src/backends/index.ts
  var backends = { pilToJs, pilToText };

  // src/frontends/peg/ast-to-pil.ts
  function astToPil(ast) {
    const { pil, reserve, emit } = createPilEmitter();
    const names = ast.definitions.map((def) => def.lhs);
    let startWrappee = "start1";
    for (let i = 1; names.includes(startWrappee); )
      startWrappee = `start${++i}`;
    reserve("start");
    reserve(startWrappee);
    ast.definitions.forEach(({ lhs: name, rhs: expr2 }) => {
      reserve(name);
      const rule = exprToRule(expr2, `${name} <- ${expr2.text}`);
      if (name === "start") {
        emit(name, { kind: "string", args: [{ kind: "Ref", name: startWrappee }], meta: { note: "" } });
        emit(startWrappee, rule);
      } else {
        emit(name, rule);
      }
    });
    validate(pil);
    return pil;
    function emitExpr(expr2) {
      if (expr2.kind === "Reference") {
        const refName = expr2.identifier === "start" ? startWrappee : expr2.identifier;
        return { kind: "Ref", name: refName };
      }
      const name = reserve();
      emit(name, exprToRule(expr2, expr2.text));
      return { kind: "Ref", name };
    }
    __name(emitExpr, "emitExpr");
    function sequenceOfRules(meta, rules) {
      if (rules.length === 1)
        return { ...rules[0], meta };
      return { kind: "sequence", meta, args: rules.map((rule) => {
        const name = reserve();
        emit(name, rule);
        return { kind: "Ref", name };
      }) };
    }
    __name(sequenceOfRules, "sequenceOfRules");
    function exprToRule(e, note) {
      const meta = { note: note ?? "" };
      switch (e.kind) {
        case "AnyChar":
          return { kind: "utf8.char", args: [{ kind: "Range", min: 0, max: 1114111 }], meta };
        case "Choice":
          return { kind: "selection", args: e.items.map(emitExpr), meta };
        case "Class":
          return { kind: "selection", meta, args: e.ranges.map(([min, max]) => {
            const range2 = { kind: "Range", min: charToCodepoint(min), max: charToCodepoint(max) };
            const name = reserve();
            emit(name, { kind: "utf8.char", args: [range2], meta: { note: `[${min}-${max}]` } });
            return { kind: "Ref", name };
          }) };
        case "Literal": {
          return sequenceOfRules(meta, [...e.value].map((c2) => ({
            kind: "utf8.char",
            args: [{ kind: "Range", min: charToCodepoint(c2), max: charToCodepoint(c2) }],
            meta: { note: printableChar(c2) }
          })));
        }
        case "Lookahead":
          return { kind: e.positive ? "assertion" : "negation", args: [emitExpr(e.expression)], meta };
        case "OneOrMore":
          return { kind: "iteration", args: [{ kind: "Range", min: 1, max: Number.MAX_SAFE_INTEGER }, emitExpr(e.expression)], meta };
        case "Optional":
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: 1 }, emitExpr(e.expression)], meta };
        case "Reference":
          return { kind: "selection", args: [{ kind: "Ref", name: e.identifier === "start" ? startWrappee : e.identifier }], meta };
        case "Sequence":
          return { kind: "sequence", args: e.items.map(emitExpr), meta };
        case "ZeroOrMore":
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: Number.MAX_SAFE_INTEGER }, emitExpr(e.expression)], meta };
        default:
          ((expr2) => {
            throw new Error(`unrecognised node kind '${expr2.kind}'`);
          })(e);
      }
    }
    __name(exprToRule, "exprToRule");
  }
  __name(astToPil, "astToPil");
  function createPilEmitter() {
    const pil = { rules: {} };
    let counter = 0;
    const dummy = { kind: "sequence", args: [], meta: { note: "" } };
    const reserve = /* @__PURE__ */ __name((name = `$${++counter}`) => (emit(name, dummy), name), "reserve");
    function emit(name, rule) {
      if ((pil.rules[name] ?? dummy) !== dummy)
        throw new Error(`Rule '${name}' has multiple definitions`);
      pil.rules[name] = rule;
    }
    __name(emit, "emit");
    ;
    return { pil, reserve, emit };
  }
  __name(createPilEmitter, "createPilEmitter");
  function charToCodepoint(c2) {
    const chars = [...c2];
    if (chars.length !== 1)
      throw new Error(`Expected a single character but found '${JSON.stringify(c2)}'`);
    return chars[0].codePointAt(0);
  }
  __name(charToCodepoint, "charToCodepoint");
  function printableChar(c2) {
    const cp = charToCodepoint(c2);
    return cp >= 32 ? c2 : `\\x${cp.toString(16).padStart(2, "0")}`;
  }
  __name(printableChar, "printableChar");

  // src/frontends/peg/peg-to-pil.ts
  var import_peg = __toESM(require_peg());
  function pegToPil(pegSource) {
    const ast = (0, import_peg.parse)(pegSource);
    return astToPil(ast);
  }
  __name(pegToPil, "pegToPil");

  // src/frontends/pen/resolve-names.ts
  function resolveNames(ast) {
    const scopes = [];
    scopes.push({ names: new Set(ast.definitions.map((d2) => d2.lhs)) });
    const refs = /* @__PURE__ */ new Map();
    traverse(ast, (expr2, recurse) => {
      switch (expr2.kind) {
        case "Grammar": {
          scopes.push({ names: new Set(expr2.definitions.map((d2) => d2.lhs)) });
          recurse();
          scopes.pop();
          break;
        }
        case "Reference": {
          for (let scopeIndex = scopes.length - 1; scopeIndex >= 0; --scopeIndex) {
            if (scopes[scopeIndex].names.has(expr2.identifier)) {
              refs.set(expr2, scopes.length - scopeIndex - 1);
              return;
            }
          }
          throw new Error(`No definition found for '${expr2.identifier}'`);
        }
        default:
          recurse();
      }
    });
    const getNextCounter = (() => {
      let counter = 0;
      return () => ++counter;
    })();
    const prefixes = [""];
    ast.definitions = rewriteDefinitions(ast.definitions, "");
    return;
    function rewriteDefinitions(definitions, prefix) {
      const result = [];
      for (const { lhs: oldLhs, rhs } of definitions) {
        const lhs = prefix + oldLhs;
        result.push({ kind: "Definition", lhs, rhs });
        traverse(rhs, (e, rec) => {
          if (e.kind === "Grammar") {
            const defns = e.definitions;
            const prefix2 = e === rhs ? lhs + "$" : `${lhs}$${getNextCounter()}$`;
            prefixes.push(prefix2);
            Object.assign(e, { kind: "Reference", identifier: prefix2 + "start", definitions: void 0 });
            result.push(...rewriteDefinitions(defns, prefix2));
            rec();
            prefixes.pop();
          } else if (e.kind === "Reference") {
            const skip = refs.get(e);
            const pre = prefixes[prefixes.length - 1 - skip];
            e.identifier = pre + e.identifier;
          } else {
            rec();
          }
        });
      }
      return result;
    }
    __name(rewriteDefinitions, "rewriteDefinitions");
  }
  __name(resolveNames, "resolveNames");
  function traverse(e, visit2) {
    visit2(e, () => {
      switch (e.kind) {
        case "Choice":
          return e.items.forEach((item) => traverse(item, visit2));
        case "Dual":
          return traverse(e.parse, visit2), traverse(e.print, visit2);
        case "Grammar":
          return e.definitions.forEach((defn) => traverse(defn.rhs, visit2));
        case "List":
          return e.items.forEach((item) => traverse(item.kind === "Splice" ? item.expression : item, visit2));
        case "Lookahead":
          return traverse(e.expression, visit2);
        case "OneOrMore":
          return traverse(e.expression, visit2);
        case "Optional":
          return traverse(e.expression, visit2);
        case "Sequence":
          return e.items.forEach((item) => traverse(item, visit2));
        case "Record":
          return e.items.forEach((item) => {
            if (item.kind === "Splice")
              return traverse(item.expression, visit2);
            if (typeof item.label !== "string")
              traverse(item.label, visit2);
            traverse(item.expression, visit2);
          });
        case "ZeroOrMore":
          return traverse(e.expression, visit2);
      }
    });
  }
  __name(traverse, "traverse");

  // src/frontends/pen/type-check.ts
  function typeCheck(ast) {
    let seedTypes = /* @__PURE__ */ new Map();
    let baseTypes;
    while (true) {
      baseTypes = /* @__PURE__ */ new Map();
      const getBaseType = createBaseTypeDeriver(ast, seedTypes);
      ast.definitions.forEach((defn) => visit(defn.rhs, (e) => baseTypes.set(e, getBaseType(e))));
      if (seedTypes.size === baseTypes.size) {
        const entries = Array.from(seedTypes.entries());
        if (entries.every(([k, v]) => baseTypes.get(k) === (v ?? "NOTHING")))
          break;
      }
      seedTypes = baseTypes;
    }
    const test = {};
    ast.definitions.forEach((defn) => test[defn.lhs] = baseTypes.get(defn.rhs));
    const startExpr = ast.definitions.find((defn) => defn.lhs === "start")?.rhs;
    if (!startExpr)
      throw new Error(`The grammar must have a 'start' rule`);
    if (baseTypes.get(startExpr) === "NOTHING")
      throw new Error(`The 'start' rule must have a non-empty value`);
    ast.definitions.forEach(({ lhs, rhs }) => visit(rhs, (e) => {
      if (e.kind === "List") {
        const elemTypes = e.items.flatMap((item) => item.kind === "Splice" ? [] : baseTypes.get(item));
        if (elemTypes.some((t) => t === "NOTHING")) {
          throw new Error(`Rule '${lhs}': all list elements must have non-empty values`);
        }
      }
      if (e.kind === "Record") {
        const fieldTypes = e.items.flatMap((item) => item.kind === "Splice" ? [] : [
          typeof item.label === "string" ? "STRING" : baseTypes.get(item.label),
          baseTypes.get(item.expression)
        ]);
        if (fieldTypes.some((t, i) => i % 2 === 0 && t !== "STRING")) {
          throw new Error(`Rule '${lhs}': all field names must be strings`);
        }
        if (fieldTypes.some((t, i) => i % 2 === 1 && t === "NOTHING")) {
          throw new Error(`Rule '${lhs}': all field values must have non-empty values`);
        }
      }
    }));
    return baseTypes;
  }
  __name(typeCheck, "typeCheck");
  function visit(e, cb) {
    cb(e);
    switch (e.kind) {
      case "Choice":
        return e.items.forEach((item) => visit(item, cb));
      case "Dual":
        return visit(e.parse, cb), visit(e.print, cb);
      case "Grammar":
        return e.definitions.forEach((defn) => visit(defn.rhs, cb));
      case "List":
        return e.items.forEach((item) => visit(item.kind === "Splice" ? item.expression : item, cb));
      case "Lookahead":
        return visit(e.expression, cb);
      case "OneOrMore":
        return visit(e.expression, cb);
      case "Optional":
        return visit(e.expression, cb);
      case "Sequence":
        return e.items.forEach((item) => visit(item, cb));
      case "Record":
        return e.items.forEach((item) => {
          if (item.kind === "Splice")
            return visit(item.expression, cb);
          if (typeof item.label !== "string")
            visit(item.label, cb);
          visit(item.expression, cb);
        });
      case "ZeroOrMore":
        return visit(e.expression, cb);
    }
  }
  __name(visit, "visit");
  function createBaseTypeDeriver(ast, seedTypes) {
    const getBaseType = memoise((memos) => (e) => {
      memos.set(e, seedTypes.get(e) ?? "NOTHING");
      switch (e.kind) {
        case "ByteList":
        case "StringC":
        case "IntrinsicInd":
        case "IntrinsicDed":
        case "IntrinsicTab":
          return "NOTHING";
        case "IntrinsicBin":
        case "IntrinsicFloat":
        case "IntrinsicHex":
        case "IntrinsicInt":
        case "Scalar":
          return "SCALAR";
        case "AnyChar":
        case "StringA":
        case "StringX":
          return "STRING";
        case "List": {
          for (const item of e.items) {
            getBaseType(item.kind === "Splice" ? item.expression : item);
          }
          return "LIST";
        }
        case "Record": {
          for (const item of e.items) {
            getBaseType(item.expression);
          }
          return "RECORD";
        }
        case "Choice": {
          if (e.items.length === 0)
            return "VARIANT";
          let t = getBaseType(e.items[0]);
          for (const item of e.items.slice(1)) {
            const next = getBaseType(item);
            if (t === "NOTHING") {
              t = next;
            } else if (next === "NOTHING") {
            } else if (t !== next) {
              t = "VARIANT";
            }
          }
          return t;
        }
        case "Dual": {
          let t1 = getBaseType(e.parse);
          let t2 = getBaseType(e.print);
          if (t1 !== t2)
            throw new Error(`Dual elements must be of the same type (${t1} != ${t2})`);
          return t1;
        }
        case "Lookahead": {
          getBaseType(e.expression);
          return "NOTHING";
        }
        case "OneOrMore":
        case "ZeroOrMore": {
          const t = getBaseType(e.expression);
          if (t === "NOTHING")
            return "NOTHING";
          if (t === "SCALAR" || t === "VARIANT") {
            throw new Error(`Cannot iterate over a scalar or variant`);
          }
          return t;
        }
        case "Optional": {
          return getBaseType(e.expression);
        }
        case "Reference": {
          const tgt = ast.definitions.find((defn) => defn.lhs === e.identifier);
          if (!tgt)
            throw new Error(`No definition found for '${e.identifier}'`);
          return getBaseType(tgt.rhs);
        }
        case "Sequence": {
          if (e.items.length === 0)
            return "NOTHING";
          let t = getBaseType(e.items[0]);
          for (const item of e.items.slice(1)) {
            const next = getBaseType(item);
            if (next === "NOTHING")
              continue;
            switch (t) {
              case "NOTHING":
                t = next;
                break;
              case "SCALAR":
                throw new Error(`A scalar may not be sequenced with other values`);
              case "STRING":
              case "LIST":
              case "RECORD":
                if (t !== next) {
                  throw new Error(`Sequence elements must be of the same type`);
                }
                break;
              case "VARIANT":
                throw new Error(`A variant may not be sequenced with other values`);
            }
          }
          return t;
        }
        case "Grammar":
          throw new Error("Internal error");
      }
    });
    return getBaseType;
  }
  __name(createBaseTypeDeriver, "createBaseTypeDeriver");

  // src/frontends/pen/ast-to-pil.ts
  function astToPil2(ast) {
    const { pil, reserve, emit } = createPilEmitter2();
    resolveNames(ast);
    const types = typeCheck(ast);
    const start = ast.definitions.find((def) => def.lhs === "start");
    const isStartWrapped = ["STRING", "LIST", "RECORD"].includes(types.get(start.rhs));
    const names = ast.definitions.map((def) => def.lhs);
    let startWrappee = "start1";
    for (let i = 1; names.includes(startWrappee); )
      startWrappee = `start${++i}`;
    reserve("start");
    if (isStartWrapped)
      reserve(startWrappee);
    ast.definitions.forEach(({ lhs: name, rhs: expr2 }) => {
      reserve(name);
      const rule = exprToRule(expr2, `${name} = ${expr2.text}`);
      if (name === "start" && isStartWrapped) {
        const kind = types.get(expr2).toLowerCase();
        emit(name, { kind, args: [{ kind: "Ref", name: startWrappee }], meta: { note: "" } });
        emit(startWrappee, rule);
      } else {
        emit(name, rule);
      }
    });
    validate(pil);
    return pil;
    function emitExpr(expr2) {
      if (expr2.kind === "Reference") {
        const refName = expr2.identifier === "start" && isStartWrapped ? startWrappee : expr2.identifier;
        return { kind: "Ref", name: refName };
      }
      const name = reserve();
      emit(name, exprToRule(expr2, expr2.text));
      return { kind: "Ref", name };
    }
    __name(emitExpr, "emitExpr");
    function sequenceOfRules(meta, ruleThunks) {
      if (ruleThunks.length === 1)
        return { ...ruleThunks[0](), meta };
      return { kind: "sequence", meta, args: ruleThunks.map((ruleThunk) => {
        const name = reserve();
        emit(name, ruleThunk());
        return { kind: "Ref", name };
      }) };
    }
    __name(sequenceOfRules, "sequenceOfRules");
    function selectionOfRules(meta, ruleThunks) {
      if (ruleThunks.length === 1)
        return { ...ruleThunks[0](), meta };
      return { kind: "selection", meta, args: ruleThunks.map((ruleThunk) => {
        const name = reserve();
        emit(name, ruleThunk());
        return { kind: "Ref", name };
      }) };
    }
    __name(selectionOfRules, "selectionOfRules");
    function emitHead(kind, expr2) {
      const name = reserve();
      let rule;
      if (kind === "string" && expr2.kind === "Scalar" && typeof expr2.value === "string") {
        rule = { kind: "scalar", args: [{ kind: "Const", value: expr2.value }], meta: { note: "" } };
      } else {
        rule = { kind, args: [emitExpr(expr2)], meta: { note: "" } };
      }
      emit(name, rule);
      return { kind: "Ref", name };
    }
    __name(emitHead, "emitHead");
    function exprToRule(e, note) {
      const meta = { note: note ?? "" };
      switch (e.kind) {
        case "AnyChar": {
          return { kind: "utf8.char", args: [{ kind: "Range", min: 0, max: 1114111 }], meta };
        }
        case "ByteList": {
          return sequenceOfRules(meta, e.items.map((item) => () => {
            const [min, max] = typeof item === "number" ? [item, item] : item;
            return { kind: "byte", args: [{ kind: "Range", min, max }], meta: { note: `#${min}-${max}` } };
          }));
        }
        case "Choice": {
          if (types.get(e) !== "VARIANT") {
            return { kind: "selection", args: e.items.map(emitExpr), meta };
          } else {
            const args = e.items.map((item) => {
              const itemType = types.get(item);
              if (itemType === "STRING")
                return emitHead("string", item);
              if (itemType === "LIST")
                return emitHead("list", item);
              if (itemType === "RECORD")
                return emitHead("record", item);
              return emitExpr(item);
            });
            return { kind: "selection", args, meta };
          }
        }
        case "Dual":
          return { kind: "dual", args: [emitExpr(e.parse), emitExpr(e.print)], meta };
        case "Grammar":
          throw new Error("Internal error");
        case "IntrinsicBin":
          return { kind: "utf8.int", args: [{ kind: "Utf8IntArgs", base: 2, signed: false }], meta };
        case "IntrinsicFloat":
          return { kind: "utf8.float", args: [], meta };
        case "IntrinsicInt":
          return { kind: "utf8.int", args: [{ kind: "Utf8IntArgs", base: 10, signed: true }], meta };
        case "IntrinsicHex":
          return { kind: "utf8.int", args: [{ kind: "Utf8IntArgs", base: 16, signed: false }], meta };
        case "IntrinsicInd":
          return { kind: "mod", args: [{ kind: "Const", value: "indent-inc" }], meta };
        case "IntrinsicDed":
          return { kind: "mod", args: [{ kind: "Const", value: "indent-dec" }], meta };
        case "IntrinsicTab":
          return { kind: "mod", args: [{ kind: "Const", value: "indent-tab" }], meta };
        case "List": {
          if (e.items.length === 0)
            return { kind: "sequence", args: [], meta };
          const seqParts = split(e.items, (a, b) => a.kind === "Splice" || b.kind === "Splice");
          return sequenceOfRules(meta, seqParts.map((items) => () => {
            if (items[0].kind === "Splice")
              return exprToRule(items[0].expression);
            return { kind: "sequence", meta: { note: "" }, args: items.map((item) => {
              if (item.kind === "Splice")
                throw new Error(`assertion failed: item.kind !== 'Splice'`);
              const elemType = types.get(item);
              if (elemType === "STRING")
                return emitHead("string", item);
              if (elemType === "LIST")
                return emitHead("list", item);
              if (elemType === "RECORD")
                return emitHead("record", item);
              return emitExpr(item);
            }) };
          }));
        }
        case "Lookahead": {
          return { kind: e.positive ? "assertion" : "negation", args: [emitExpr(e.expression)], meta };
        }
        case "OneOrMore": {
          return { kind: "iteration", args: [{ kind: "Range", min: 1, max: Number.MAX_SAFE_INTEGER }, emitExpr(e.expression)], meta };
        }
        case "Optional": {
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: 1 }, emitExpr(e.expression)], meta };
        }
        case "Record": {
          if (e.items.length === 0)
            return { kind: "sequence", args: [], meta };
          const seqParts = split(e.items, (a, b) => a.kind === "Splice" || b.kind === "Splice");
          return sequenceOfRules(meta, seqParts.map((items) => () => {
            if (items[0].kind === "Splice")
              return exprToRule(items[0].expression);
            return { kind: "sequence", meta: { note: "" }, args: [].concat(...items.map((item) => {
              if (item.kind !== "Field")
                throw new Error(`assertion failed: item.kind === 'Field'`);
              let label2 = item.label;
              if (typeof label2 === "string")
                label2 = { kind: "Scalar", value: label2, text: "" };
              const type = types.get(item.expression);
              let fieldType;
              if (type === "STRING")
                fieldType = "string";
              if (type === "LIST")
                fieldType = "list";
              if (type === "RECORD")
                fieldType = "record";
              const name = reserve();
              const refs = [
                emitHead("string", label2),
                fieldType ? emitHead(fieldType, item.expression) : emitExpr(item.expression)
              ];
              emit(name, { kind: "field", args: refs, meta: { note: "" } });
              return [{ kind: "Ref", name }];
            })) };
          }));
        }
        case "Reference": {
          return {
            kind: "selection",
            args: [{ kind: "Ref", name: e.identifier === "start" && isStartWrapped ? startWrappee : e.identifier }],
            meta
          };
        }
        case "Scalar": {
          return { kind: "scalar", args: [{ kind: "Const", value: e.value }], meta };
        }
        case "Sequence": {
          return { kind: "sequence", args: e.items.map(emitExpr), meta };
        }
        case "StringA": {
          return sequenceOfRules(meta, e.items.map((item) => () => {
            if (typeof item === "string") {
              return sequenceOfRules({ note: JSON.stringify(item) }, [...item].map((c2) => () => ({
                kind: "char",
                args: [{ kind: "Range", min: charToCodepoint2(c2), max: charToCodepoint2(c2) }],
                meta: { note: printableChar2(c2) }
              })));
            } else {
              const note2 = `[${item.map(([min, max]) => `${min}-${max}`).join("")}]`;
              return selectionOfRules({ note: note2 }, item.map(([min, max]) => () => ({
                kind: "char",
                args: [{ kind: "Range", min: charToCodepoint2(min), max: charToCodepoint2(max) }],
                meta: { note: `[${printableChar2(min)}-${printableChar2(max)}]` }
              })));
            }
          }));
        }
        case "StringC": {
          return sequenceOfRules(meta, e.items.map((item) => () => {
            if (typeof item === "string") {
              const bytes = stringToUtf8Bytes(item);
              return sequenceOfRules({ note: "" }, bytes.map((byte) => () => ({
                // TODO: fix meta
                kind: "byte",
                args: [{ kind: "Range", min: byte, max: byte }],
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
              return selectionOfRules({ note: note2 }, ranges.map(([min, max]) => () => ({
                // TODO: fix meta
                kind: "byte",
                args: [{ kind: "Range", min, max }],
                meta: { note: `[${min}-${max}]` }
              })));
            }
          }));
        }
        case "StringX": {
          return sequenceOfRules(meta, e.items.map((item) => () => {
            if (typeof item === "string") {
              return sequenceOfRules({ note: JSON.stringify(item) }, [...item].map((c2) => () => ({
                kind: "utf8.char",
                args: [{ kind: "Range", min: charToCodepoint2(c2), max: charToCodepoint2(c2) }],
                meta: { note: printableChar2(c2) }
              })));
            } else {
              const note2 = `[${item.map(([min, max]) => `${min}-${max}`).join("")}]`;
              return selectionOfRules({ note: note2 }, item.map(([min, max]) => () => ({
                kind: "utf8.char",
                args: [{ kind: "Range", min: charToCodepoint2(min), max: charToCodepoint2(max) }],
                meta: { note: `[${printableChar2(min)}-${printableChar2(max)}]` }
              })));
            }
          }));
        }
        case "ZeroOrMore": {
          return { kind: "iteration", args: [{ kind: "Range", min: 0, max: Number.MAX_SAFE_INTEGER }, emitExpr(e.expression)], meta };
        }
        default: {
          ((expr2) => {
            throw new Error(`unrecognised node kind '${expr2.kind}'`);
          })(e);
        }
      }
    }
    __name(exprToRule, "exprToRule");
  }
  __name(astToPil2, "astToPil");
  function createPilEmitter2() {
    const pil = { rules: {} };
    let counter = 0;
    const dummy = { kind: "sequence", args: [], meta: { note: "" } };
    const reserve = /* @__PURE__ */ __name((name = `$${++counter}`) => (emit(name, dummy), name), "reserve");
    function emit(name, rule) {
      if ((pil.rules[name] ?? dummy) !== dummy)
        throw new Error(`Rule '${name}' has multiple definitions`);
      pil.rules[name] = rule;
    }
    __name(emit, "emit");
    ;
    return { pil, reserve, emit };
  }
  __name(createPilEmitter2, "createPilEmitter");
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
  function printableChar2(c2) {
    const cp = charToCodepoint2(c2);
    return cp >= 32 ? c2 : `\\x${cp.toString(16).padStart(2, "0")}`;
  }
  __name(printableChar2, "printableChar");
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
    const pil = (0, import_pil.parse)(pilSource);
    const { errors } = validate(pil);
    if (errors.length > 0)
      throw new Error(`PIL validation errors: 
  ` + errors.join("\n"));
    return pil;
  }
  __name(textToPil, "textToPil");

  // src/frontends/index.ts
  var frontends = { pegToPil, penToPil, textToPil };

  // src/api.ts
  function penc(source, options2) {
    const opts = validateOptions(options2);
    const mods = pilMods;
    const frontend = chooseFrontend(opts);
    const backend = chooseBackend(opts);
    const pil = frontend(source);
    const { pil: analysedPil, errors } = analyse(pil, opts.build, mods);
    if (errors.length) {
      throw new Error(`Error(s):
  ${errors.join("\n")}`);
    }
    const result = backend(analysedPil);
    return result;
  }
  __name(penc, "penc");
  function validateOptions(options2) {
    const opts = { frontend: "pen", build: "parse", backend: "js/cjs", debug: false, ...options2 };
    if (!["pen", "pil", "peg"].includes(opts.frontend))
      throw new Error(`Unsupported frontend value '${opts.frontend}'`);
    if (!["js/cjs", "js/iife", "pil"].includes(opts.backend))
      throw new Error(`Unsupported backend value '${opts.backend}'`);
    if (!["parse", "print"].includes(opts.build))
      throw new Error(`Unsupported build value '${opts.build}'`);
    return opts;
  }
  __name(validateOptions, "validateOptions");
  function chooseFrontend(opts) {
    switch (opts.frontend) {
      case "pen":
        return frontends.penToPil;
      case "peg":
        return frontends.pegToPil;
      case "pil":
        return frontends.textToPil;
    }
  }
  __name(chooseFrontend, "chooseFrontend");
  function chooseBackend(opts) {
    const { build, debug: emitDebugAssertions } = opts;
    const mods = pilMods;
    switch (opts.backend) {
      case "js/cjs":
        return (pil) => backends.pilToJs(pil, { build, flavour: "cjs", emitDebugAssertions, mods });
      case "js/iife":
        return (pil) => backends.pilToJs(pil, { build, flavour: "iife", emitDebugAssertions, mods });
      case "pil":
        return (pil) => backends.pilToText(pil);
    }
  }
  __name(chooseBackend, "chooseBackend");

  return __toCommonJS(api_exports);
})();
