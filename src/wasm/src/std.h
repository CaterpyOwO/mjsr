#pragma once

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

typedef enum
{
    true = 1, false = 0
} bool;

#define export __attribute__((used))

// #define console_log(str) __js_console_log(str, __builtin_strlen(str));

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


void __js_console_log(const char* str, int len);
void __js_console_error(const char* str, int len);

