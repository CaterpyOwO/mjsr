#include "include/std.h"

export i32 main()
{
    console_log("console.log call");
    console_error("console.error call");

    // char str[50];

    // strcpy(str,"This is string.h library function");
    // printf(str);

    // memset(str, '$', 7);
    // printf(str);

    printf("Testing printf() %d 0x%x.\nANSI escape code test:", 111, 0xaa);

    for (int i=0; i<=7; i++) {
        printf("\\033[0;%dm %d \\033[0m \\033[0;%dm %d \\033[0m  \\033[%dm %d \\033[0m  \\033[0;%dm %d \\033[0m", i+30,i+30, i+90,i+90, i+40,i+40, i+100,i+100);
    }

    // sus code
    return (i32)floorf(sinf(15.5f));
}