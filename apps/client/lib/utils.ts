import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import forEach from "lodash/forEach";
import set from "lodash/set";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mergeWithCN = (target: any, source?: any) => {
  const merged: any = { ...target }; // Start with a copy of the target

  // Iterate over keys in the target object
  for (const key in target) {
    // Check if source is defined and both target[key] and source[key] are objects
    if (
      source !== undefined &&
      typeof target[key] === "object" &&
      typeof source[key] === "object"
    ) {
      // Recursively merge nested objects
      merged[key] = mergeWithCN(target[key], source[key]);
    } else {
      // Otherwise, copy target[key] as is to merged[key]
      merged[key] = target[key];
    }
  }

  // If source is defined, merge additional properties from source
  if (source !== undefined) {
    for (const key in source) {
      if (!(key in target)) {
        // If key from source is not in target, add it to merged
        merged[key] = source[key];
      } else if (
        typeof target[key] === "object" &&
        typeof source[key] === "string"
      ) {
        // If target[key] is an object and source[key] is a string, apply the string as a new property in the object
        merged[key] = { ...target[key], [source[key]]: true };
      } else if (
        typeof target[key] === "string" &&
        typeof source[key] === "string"
      ) {
        // If both target[key] and source[key] are strings, use a custom merging function (e.g., cn) if needed
        merged[key] = cn(source[key], target[key]); // For now, directly assign the source[key] string
      }
      // For other cases, keep the existing value in merged[key]
    }
  }

  return merged;
};

export const flatToNested = (flatObject: any): any => {
  const nestedObject = {};
  forEach(flatObject, (value, key) => {
    const keys = key.split(".");
    set(nestedObject, keys, value);
  });
  return nestedObject;
};

export const getSvgWithClass = (svgContent: string, ...classes: string[]) => {
  return svgContent.replace("<svg", `<svg class="${cn(classes)}"`);
};

export const scrollToTop = (): void => {
  const currentPosition: number = window.pageYOffset;
  const targetPosition: number = 0;
  const duration: number = 500; // Duration of the scroll animation in milliseconds

  const startTime: number = performance.now();

  function scrollAnimation(currentTime: number): void {
    const timeElapsed: number = currentTime - startTime;

    window.scrollTo(
      0,
      easeOutQuad(
        timeElapsed,
        currentPosition,
        targetPosition - currentPosition,
        duration,
      ),
    );

    if (timeElapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  function easeOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d;
    return -c * t * (t - 2) + b;
  }

  requestAnimationFrame(scrollAnimation);
};
