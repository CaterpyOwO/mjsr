#import "include/std.h"

export int main()
{
    console_log("console.log call");
    console_error("console.error call");

    printf("Testing printf() %d 0x%x.", 111, 0xaa);

    return 0;
}