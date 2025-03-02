import { Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

@Injectable({
  providedIn: 'root'
})
export class Utils {

  //#region UUID

  /**
   * Generate an UUID
   * @returns {string} The UUID.
   */
  static generateUUID(): string {
    return uuidv4()
  }

  //#region DATE

  /**
 * Formats a given date into a specified format.
 * @param {Date | string} date - The date to format.
 * @param {string} [format='YYYY-MM-DD'] - The format to use.
 * @returns {string} The formatted date.
 */
  static formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
    return dayjs(date).format(format)
  }

  /**
 * Calculates the difference in days between two dates.
 * @param {Date | string} date1 - The first date.
 * @param {Date | string} date2 - The second date.
 * @returns {number} The number of days between the dates.
 */
  static daysBetween(date1: Date | string, date2: Date | string): number {
    return dayjs(date2).diff(dayjs(date1), 'day')
  }

  /**
 * Returns the current date and time in the specified format.
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - The format of the date.
 * @returns {string} The formatted current date and time.
 */
  static getCurrentDate(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs().format(format)
  }

  //#region VALIDATION

  /**
   * 
   * @param {string} email 
   * @returns {boolean} 'true' if the email is valid
   */
  static isValidEmail(email: string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  }

  /**
   * 
   * @param {string} password 
   * @param {number} minLength - The length of the password 
   * @returns 
   */
  static isValidPassword(password: string, minLength = 8): boolean {
    return password.length >= minLength
  }

  //#region OBJECTS

  /**
 * Creates a deep copy of an object, ensuring nested objects are fully cloned.
 * @template T - The type of the object being cloned.
 * @param {T} obj - The object to be deeply cloned.
 * @returns {T} A new object that is a deep copy of the input.
 */
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  /**
 * Converts an object into a formatted JSON string.
 * @param {object} obj - The object to stringify.
 * @returns {string} The formatted JSON string.
 * @example
 * Utils.prettyJSON({ name: "Alice", age: 25 });
 * // Output:
 * // `{
 * //   "name": "Alice",
 * //   "age": 25
 * // }`
 */
  static prettyJSON(obj: object): string {
    return JSON.stringify(obj, null, 2)
  }


  //#region STRINGS
  /**
   * Capitalize the given text
   * @param {string} text 
   * @returns {string} - Capitalized text
   */
  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  /**
 * Truncates a string if it exceeds a given length.
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - Maximum allowed length.
 * @returns {string} The truncated string with `...` if necessary.
 * @example
 * Utils.truncateText("Hello, this is a long text!", 10); // "Hello, thi..."
 */
  static truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }


  /**
 * Capitalizes the first letter of every word in a string.
 * @param {string} text - The input string.
 * @returns {string} The capitalized string.
 * @example
 * Utils.capitalizeWords("hello world"); // "Hello World"
 */
  static capitalizeWords(text: string): string {
    return text.replace(/\b\w/g, char => char.toUpperCase())
  }


  /**
   * Extract the numbers in the text given
   * @param {string} text 
   * @returns {number[]} - An array of numbers
   */
  static extractNumbers(text: string): number[] {
    return (text.match(/\d+/g) || []).map(Number)
  }

  /**
   * Create a random string of characters
   * @param {number} length 
   * @returns {string} - Random characters
   */
  static randomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Utils.randomNumber(0, chars.length - 1))).join('')
  }


  //#region WEB
  /**
 * Converts an object into a URL query string.
 * @param {Record<string, any>} obj - The object to convert into query parameters.
 * @returns {string} A URL query string representation of the object.
 * @example
 * const params = { page: 2, filter: 'active' };
 * Utils.objectToQueryParams(params); // "page=2&filter=active"
 */
  static objectToQueryParams(obj: Record<string, any>): string {
    return new URLSearchParams(obj).toString()
  }

  /**
 * Converts a string into a URL-friendly slug.
 * @param {string} text - The text to convert into a slug.
 * @returns {string} A slugified version of the input text.
 * @example
 * Utils.toSlug("Hello World! This is Angular."); // "hello-world-this-is-angular"
 */
  static toSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, '-') // Replace spaces for '-'
      .replace(/[^\w-]+/g, '') // Delete special characters
      .replace(/--+/g, '-'); // Prevent multiple '-'
  }

  //#region MATH
  /**
 * Generates a random integer between a specified minimum and maximum range.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between `min` and `max`.
 * @example
 * Utils.randomNumber(1, 10); // Returns a random number between 1 and 10
 */
  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


  //#region COLORS
  /**
 * Generates a random hexadecimal color code.
 * @returns {string} A random hex color in the format `#RRGGBB`.
 * @example
 * Utils.randomHexColor(); // "#a3f4c1"
 */
  static randomHexColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
  }

  /**
 * Generates a random RGB color string.
 * @returns {string} A random RGB color in the format `rgb(R, G, B)`.
 * @example
 * Utils.randomRGBColor(); // "rgb(123, 45, 200)"
 */
  static randomRGBColor(): string {
    const r = Utils.randomNumber(0, 255)
    const g = Utils.randomNumber(0, 255)
    const b = Utils.randomNumber(0, 255)
    return `rgb(${r}, ${g}, ${b})`
  }

  /**
 * Generates a random HSL color string.
 * @returns {string} A random HSL color in the format `hsl(H, S%, L%)`.
 * @example
 * Utils.randomHSLColor(); // "hsl(200, 85%, 60%)"
 */
  static randomHSLColor(): string {
    const h = Utils.randomNumber(0, 360)
    const s = Utils.randomNumber(40, 100)
    const l = Utils.randomNumber(40, 80)
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  /**
 * Converts a hexadecimal color to an RGB object.
 * @param {string} hex - The hexadecimal color string (e.g., `#ff5733` or `#f53`).
 * @returns {{ r: number, g: number, b: number } | null} An object with `r`, `g`, and `b` values, or `null` if invalid.
 * @example
 * Utils.hexToRGB("#ff5733"); // { r: 255, g: 87, b: 51 }
 */
  static hexToRGB(hex: string): { r: number, g: number, b: number } | null {
    hex = hex.replace(/^#/, '')

    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('')
    }
    if (hex.length !== 6) return null
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return { r, g, b }
  }

  /**
 * Converts RGB color values to a hexadecimal color string.
 * @param {number} r - Red component (0-255).
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @returns {string} The hexadecimal representation of the RGB color.
 * @example
 * Utils.rgbToHex(255, 87, 51); // "#ff5733"
 */
  static rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')
  }

  //#region BASE 64
  /**
 * Encodes a string into Base64 format.
 * @param {string} text - The string to encode.
 * @returns {string} The Base64 encoded string.
 * @example
 * Utils.base64Encode("Hello, World!"); // "SGVsbG8sIFdvcmxkIQ=="
 */
  static base64Encode(text: string): string {
    return btoa(text)
  }

  /**
 * Decodes a Base64 encoded string.
 * @param {string} encoded - The Base64 encoded string.
 * @returns {string} The decoded string.
 * @example
 * Utils.base64Decode("SGVsbG8sIFdvcmxkIQ=="); // "Hello, World!"
 */
  static base64Decode(encoded: string): string {
    return atob(encoded)
  }


  //#region ARRAYS
  /**
 * Checks if an array is empty or contains only falsy values.
 * @param {any[]} array - The array to check.
 * @returns {boolean} `true` if the array is empty or contains only falsy values.
 * @example
 * Utils.isEmptyArray([]); // true
 * Utils.isEmptyArray([null, undefined, false]); // true
 */
  static isEmptyArray(array: any[]): boolean {
    return array.length === 0 || array.every(item => !item)
  }

  /**
 * Removes duplicate values from an array.
 * @param {T[]} array - The array with possible duplicate values.
 * @returns {T[]} A new array without duplicates.
 * @example
 * Utils.removeDuplicates([1, 2, 2, 3]); // [1, 2, 3]
 */
  static removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)]
  }

  /**
 * Shuffles an array using Fisher-Yates algorithm.
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} A new array with elements in random order.
 * @example
 * Utils.shuffleArray([1, 2, 3, 4]); // Output: [3, 1, 4, 2]
 */
  static shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  /**
 * Returns a random element from an array.
 * @param {T[]} array - The array to pick from.
 * @returns {T | null} A random element from the array, or null if empty.
 * @example
 * Utils.getRandomElement([1, 2, 3, 4]); // Output: 2
 */
  static getRandomElement<T>(array: T[]): T | null {
    return array.length > 0 ? array[Math.floor(Math.random() * array.length)] : null
  }








}
