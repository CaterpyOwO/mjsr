#import "std.h"

export i32 main()
{
    console_log("Logging seems to be in order!");

    int x = 1;
    char a = x + '0';

    const char *b = &a;

    console_error(b);
    return 0;
}