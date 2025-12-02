// transpile:main
import {
  getPath,
  getVersion,
  getMaxIOSSDK,
  getMaxTVOSSDK,
  getClangVersion,
} from './xcode';

import { setLimrunIosClient } from './helpers';

const xcode = {
  getPath,
  getVersion,
  getMaxIOSSDK,
  getMaxTVOSSDK,
  getClangVersion,
  setLimrunIosClient,
};

export {
  getPath,
  getVersion,
  getMaxIOSSDK,
  getMaxTVOSSDK,
  getClangVersion,
  setLimrunIosClient,
};
export default xcode;

export type { XcodeVersion } from './types';

