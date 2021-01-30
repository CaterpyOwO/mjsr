#ifndef __WASM_STD__
#define __WASM_STD__

#include <stdarg.h>
#include <stddef.h>
#include "mini-printf.h"

/**
    WASM Typedefs
*/
typedef signed char i8;
typedef unsigned char u8;
typedef signed short i16;
typedef unsigned short u16;
typedef signed int i32;
typedef unsigned int u32;
typedef signed long long i64;
typedef unsigned long long u64;
typedef float f32;
typedef double f64;

/* Export definition */
#define export __attribute__((visibility("default")))

/////////////////////////////////////////////////////////////////////

/**
 * console.log & console_error macros
*/

/* Prints to `stdout` with newline */
#define console_log(str) ({                                         \
    if (__builtin_types_compatible_p (typeof (str), char[]))        \
        __js_console_log(str, __builtin_strlen(str));               \
    else                                                            \
        __js_console_error("console_log: invalid type", 25);        \
})

/* Prints to `stderr` with newline */
#define console_error(str) ({                                       \
    if (__builtin_types_compatible_p (typeof (str), char[]))        \
        __js_console_error(str, __builtin_strlen(str));             \
    else                                                            \
        __js_console_error("console_error: invalid type", 27);      \
})

/////////////////////////////////////////////////////////////////////

/**
 *   Syms
 */

void __js_console_log(const char* str, int len);
void __js_console_error(const char* str, int len);

char* strcpy (char *destination, const char * source);
void* memset (void *dest, int val, size_t len);

#endif