import _ from 'lodash';
import type { TeenProcessExecResult } from 'teen_process';
import { Ios } from '@limrun/api';

export const XCRUN_TIMEOUT = 15000;

// limrunIosClient must be set before this module is used.
var limrunIosClient: Ios.InstanceClient | null = null;

export function setLimrunIosClient(client: Ios.InstanceClient) {
  limrunIosClient = client;
}

export function getLimrunIosClient(): Ios.InstanceClient {
  if (!limrunIosClient) {
    throw new Error('Limrun iOS client not set');
  }
  return limrunIosClient;
}

/**
 * Executes 'xcrun' command line utility
 *
 * @param args xcrun arguments
 * @param timeout The maximum number of milliseconds to wait until xcrun exists
 * @returns The result of xcrun execution
 * @throws {Error} If xcrun returned non-zero exit code or timed out
 */
export async function runXcrunCommand(args: string[], timeout: number = XCRUN_TIMEOUT): Promise<TeenProcessExecResult<string>> {
  try {
    const result = await getLimrunIosClient().xcrun(args);
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      code: result.exitCode,
    };
  } catch (err) {
    // the true error can be hidden within the stderr
    if (err.stderr) {
      err.message = `${err.message}: ${err.stderr}`;
    }

    throw err;
  }
}

export async function runXcodebuildCommand(args: string[], timeout: number = XCRUN_TIMEOUT): Promise<TeenProcessExecResult<string>> {
  try {
    const result = await getLimrunIosClient().xcodebuild(args as ['-version']);
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      code: result.exitCode,
    };
  } catch (err) {
    // the true error can be hidden within the stderr
    if (err.stderr) {
      err.message = `${err.message}: ${err.stderr}`;
    }

    throw err;
  }
}

/**
 * Uses macOS Spotlight service to detect where the given app is installed
 *
 * @param bundleId Bundle identifier of the target app
 * @returns Full paths to where the app with the given bundle id is present.
 */
export async function findAppPaths(bundleId: string): Promise<string[]> {
  throw new Error('findAppPaths is not implemented');
}

/**
 * Finds and retrieves the content of the Xcode's Info.plist file
 *
 * @param developerRoot Full path to the Contents/Developer folder under Xcode.app root
 * @returns All plist entries as an object or an empty object if no plist was found
 */
export async function readXcodePlist(developerRoot: string): Promise<Record<string, any>> {
  throw new Error('readXcodePlist is not implemented');
}
