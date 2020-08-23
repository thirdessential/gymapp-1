"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinMeeting = exports.hostMeeting = void 0;

var _reactNativeZoomUs = _interopRequireDefault(require("react-native-zoom-us"));

var _appConstants = require("../constants/appConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const ZoomUs={}
var zoomUserType = 2; // 2 - pro user

var a = function a() {
  return console.warn('MEETING ENDED');
};

var hostMeeting = function hostMeeting(meetingNumber, zakTokenRaw) {
  var displayName,
      zakToken,
      userType,
      zoomToken,
      startMeetingResult,
      _args = arguments;
  return regeneratorRuntime.async(function hostMeeting$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          displayName = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'Trainer';
          _context.next = 3;
          return regeneratorRuntime.awrap(_reactNativeZoomUs["default"].initialize(_appConstants.zoomConfig.key, _appConstants.zoomConfig.secret, _appConstants.zoomConfig.domain));

        case 3:
          zakToken = decodeURIComponent(zakTokenRaw);
          userType = zoomUserType;
          zoomToken = 'null';
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(_reactNativeZoomUs["default"].startMeeting(displayName, meetingNumber.toString(), 'random', userType, zakToken, zoomToken, true));

        case 9:
          startMeetingResult = _context.sent;
          console.log({
            startMeetingResult: startMeetingResult
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](6);
          console.log({
            e: _context.t0
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 13]]);
};

exports.hostMeeting = hostMeeting;

var joinMeeting = function joinMeeting(meetingNumber, password) {
  var displayName,
      joinMeetingResult,
      _args2 = arguments;
  return regeneratorRuntime.async(function joinMeeting$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          displayName = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "User";
          _context2.next = 3;
          return regeneratorRuntime.awrap(_reactNativeZoomUs["default"].initialize(_appConstants.zoomConfig.key, _appConstants.zoomConfig.secret, _appConstants.zoomConfig.domain));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_reactNativeZoomUs["default"].joinMeetingWithPassword(displayName, meetingNumber.toString(), password, true));

        case 6:
          joinMeetingResult = _context2.sent;
          console.log({
            joinMeetingResult: joinMeetingResult
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.log({
            e: _context2.t0
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.joinMeeting = joinMeeting;