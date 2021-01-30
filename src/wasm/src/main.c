#include "include/std.h"


export i32 main()
{
    int i, j, n, p = 0;
    char p_buff[256];

    printf("ANSI escape code test:");

    for (i = 0; i < 11; i++) {

        for (j = 0; j < 10; j++) {
            n = 10 * i + j;
            if (n > 109) break;
            
            p += snprintf(p_buff + p, 128, "\\033[%dm %3d\\033[0m", n, n);
        }
        
        printf(p_buff);
        p = 0;
    }
}