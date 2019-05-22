// import Alert from "@bootstrap/alert";
// import Button from "@bootstrap/button";
// import Carousel from "@bootstrap/carousel";
// import Dropdown from "@bootstrap/dropdown";
// import Modal from "@bootstrap/modal";
// import Popover from "@bootstrap/popover";
// import Scrollspy from "@bootstrap/scrollspy";
// import Tab from "@bootstrap/tab";
// import Toast from "@bootstrap/toast";
// import Tooltip from "@bootstrap/tooltip";
import Collapse from "@bootstrap/collapse";
import Util from "@bootstrap/util";

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

(() => {
  if (typeof $ === "undefined") {
    throw new TypeError(
      "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.",
    );
  }

  const version = $.fn.jquery.split(" ")[0].split(".");
  const minMajor = 1;
  const ltMajor = 2;
  const minMinor = 9;
  const minPatch = 1;
  const maxMajor = 4;

  if (
    (version[0] < ltMajor && version[1] < minMinor)
    || (version[0] === minMajor
      && version[1] === minMinor
      && version[2] < minPatch)
    || version[0] >= maxMajor
  ) {
    throw new Error(
      "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0",
    );
  }
})();

export {
  Collapse,
  Util,
  // Alert,
  // Button,
  // Carousel,
  // Dropdown,
  // Modal,
  // Popover,
  // Scrollspy,
  // Tab,
  // Toast,
  // Tooltip
};
