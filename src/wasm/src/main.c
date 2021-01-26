#import "include/std.h"

export int main()
{
    console_log("console.log call");
    console_error("console.error call");

    printf("Testing printf() %d 0x%x.", 111, 0xaa);

    char str[50];

    strcpy(str,"This is string.h library function");
    printf(str);


    memset(str, '$', 7);
    printf(str);

    return(0);
}