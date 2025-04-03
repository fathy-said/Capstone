/**
 * Transforms an object of key-value pairs into FormData.
 *
 * @param {Object} inputs - An object containing key-value pairs to be transformed into FormData.
 * @returns {FormData} - FormData object containing the transformed data.
 *
 * @example
 * const formData = transformFormData({ key1: 'value1', key2: 'value2' });
 * // Use the formData object as needed
 */

import { MainTax } from "./global";
// fix: need test.
export const transformFormData = (inputs) => {
  const formData = new FormData();

  for (let key in inputs) {
    formData.append(key, inputs[key]);
  }

  return formData;
};

//  convert url & Bases64 to File
export function datBases64LtoFile(dataurl, filename) {
  let arr = dataurl?.split(","),
    mime = arr[0]?.match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

//convert the given date string to the "year-month-day"
export function handleFormatDate(dateString = "") {
  // Create a Date object from the given string
  const date = new Date(dateString);

  // Extract year, month, and day from the Date object
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);

  const day = ("0" + date.getDate()).slice(-2);

  // Form the year-month-day format
  const formattedDate = year + "-" + month + "-" + day;

  // Return the formatted date
  return formattedDate;
}

//convert the given date string to the "time"12:00:00
export function getTimeFromDate(dateString: string): string {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Extract hours and minutes
  let hours: number = date.getHours();
  let minutes: number | string = date.getMinutes();

  // Convert hours to AM/PM format
  const ampm: string = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Pad minutes with leading zeros if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // Construct the final time string
  const finalTime: string = hours + ":" + minutes + " " + ampm;

  return finalTime;
}

// Convert time string ":10 AM" to Date object
export function convertTimeStringToDate(timeString) {
  // Split the time string into hours, minutes, and period (AM/PM)
  const [hoursStr, minutesStr, period] = timeString?.split(/[:\s]+/);

  // Convert hours and minutes to numbers
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Adjust hours if it's PM
  if (period?.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  }

  // Create a new Date object with today's date and set the time
  const date = new Date();
  date?.setHours(hours);
  date?.setMinutes(minutes);

  // Format the date according to the specified format
  const formattedDate = date?.toString();

  return formattedDate;
}

// calculate VAT => tax
export function calculateVAT(total: any, type: 0 | 1 | any) {
  if (total !== undefined && total !== null && total !== "") {
    let salePrice = String(total).replace(/,/g, "");
    if (+salePrice > 0) {
      // Sale price includes tax
      if (type == 0) {
        const Value = +salePrice * (MainTax / (100 + MainTax));
        return +Value?.toFixed(3);
      }
      // Sale price excludes tax
      if (type == 1) {
        const Value = (MainTax * +salePrice) / 100;
        return +Value?.toFixed(3);
      }
      return "";
    }
    return "";
  }
  // Sale price includes tax
}

// calculate Total Price
export function calculateTotalPrice(total: any, type: 0 | 1) {
  if (total !== undefined && total !== null && total !== "") {
    let salePrice = String(total).replace(/,/g, "");
    if (+salePrice > 0) {
      // Sale price includes tax
      if (type == 0) {
        return salePrice;
      }
      // Sale price excludes tax
      if (type == 1) {
        const tax = +salePrice * 0.15;
        const totalPrice = +salePrice + tax;
        return totalPrice.toFixed(3);
      }
    }
    return "";
  }

  return "";
}
// Calculate the value of a batch from the project
export function calculateValueOfBatchFromProject(part: number, total: any) {
  if (total !== undefined && total !== null && total !== "") {
    let salePrice = String(total).replace(/,/g, "");
    if (+salePrice > 0 && +part > 0) {
      const Value = (+part / +salePrice) * 100;
      return " % " + Value?.toFixed(0);
    }
    return "";
  }
}

//  add "," to number
export function ReturnValueWithComma(data: any, defaultValue: any = 0) {
  if (data) {
    return (+data)?.toLocaleString();
  }
  return defaultValue || 0;
}

// PercentageCalculator Component
export const PercentageCalculator = ({
  value,
  total,
}: {
  value: number;
  total: number;
}) => {
  // Calculate percentage
  const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) {
      return 0; // To avoid division by zero
    }
    return (value / total) * 100;
  };

  // Get the percentage
  const percentage = calculatePercentage(value, total)?.toFixed(0);

  return +percentage >= 0 ? +percentage : 0;
};

// get name from path or url
export function getNameFromPath(url: string): string {
  // Create a URL object
  const urlObj = new URL(url);

  // Get the pathname from the URL object
  const pathName = urlObj.pathname;

  // Split the pathname by '/' to get individual segments
  const segments = pathName.split("/");

  // Get the last segment (filename) and remove the extension
  const fileName = segments?.pop()?.split(".")[0] || "";

  return fileName;
}

export function hasQueryParams(url: string): boolean {
  return url.includes("?");
}

// return value with tax
export function returnValueWithTax({
  value,
  withComma,
}: {
  value: number;
  withComma: boolean;
}): number | string {
  const tax = (value * 15) / 100 + +value;
  // Ensure `tax` is a number for `toFixed` and convert it if necessary
  const taxAsNumber = Number(tax);
  if (withComma && taxAsNumber > 0) {
    return ReturnValueWithComma(taxAsNumber?.toFixed(1));
  } else if (!withComma && taxAsNumber > 0) {
    return taxAsNumber?.toFixed(1);
  } else {
    return "";
  }
}

// Here’s a simple TypeScript function to check if a value is empty
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}
