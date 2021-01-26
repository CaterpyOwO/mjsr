#include "util.h"
#define export __attribute__((used))

export int why()
{
      const char * string = "console.log from C";
      console_log(string, strlen(string));

      return 0;
}



export int create(float *mat)
{
    mat[0] = 1;
    mat[5] = 1;
    mat[10] = 1;
    mat[15] = 1;

    return 0;
}

export int transpose(float *mat)
{
    float a01 = mat[1],
          a02 = mat[2],
          a03 = mat[3];
    float a12 = mat[6],
          a13 = mat[7];
    float a23 = mat[11];
    
    mat[1] = mat[4];
    mat[2] = mat[8];
    mat[3] = mat[12];
    mat[4] = a01;
    mat[6] = mat[9];
    mat[7] = mat[13];
    mat[8] = a02;
    mat[9] = a12;
    mat[11] = mat[14];
    mat[12] = a03;
    mat[13] = a13;
    mat[14] = a23;

    return 0;
}

export int invert(float *mat)
{
  float a00 = mat[0],
        a01 = mat[1],
        a02 = mat[2],
        a03 = mat[3];
  float a10 = mat[4],
        a11 = mat[5],
        a12 = mat[6],
        a13 = mat[7];
  float a20 = mat[8],
        a21 = mat[9],
        a22 = mat[10],
        a23 = mat[11];
  float a30 = mat[12],
        a31 = mat[13],
        a32 = mat[14],
        a33 = mat[15];
  float b00 = a00 * a11 - a01 * a10;
  float b01 = a00 * a12 - a02 * a10;
  float b02 = a00 * a13 - a03 * a10;
  float b03 = a01 * a12 - a02 * a11;
  float b04 = a01 * a13 - a03 * a11;
  float b05 = a02 * a13 - a03 * a12;
  float b06 = a20 * a31 - a21 * a30;
  float b07 = a20 * a32 - a22 * a30;
  float b08 = a20 * a33 - a23 * a30;
  float b09 = a21 * a32 - a22 * a31;
  float b10 = a21 * a33 - a23 * a31;
  float b11 = a22 * a33 - a23 * a32;
  
  float det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  det = 1.0 / det;
  mat[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  mat[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  mat[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  mat[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  mat[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  mat[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  mat[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  mat[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  mat[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  mat[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  mat[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  mat[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  mat[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  mat[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  mat[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  mat[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  
  return 0;
}

export int rotateX(float* mat, float rad) {
      float s = sinf(rad);
      float c = cosf(rad);

      float a10 = mat[4];
      float a11 = mat[5];
      float a12 = mat[6];
      float a13 = mat[7];
      float a20 = mat[8];
      float a21 = mat[9];
      float a22 = mat[10];
      float a23 = mat[11];

      mat[4] = a10 * c + a20 * s;
      mat[5] = a11 * c + a21 * s;
      mat[6] = a12 * c + a22 * s;
      mat[7] = a13 * c + a23 * s;
      mat[8] = a20 * c - a10 * s;
      mat[9] = a21 * c - a11 * s;
      mat[10] = a22 * c - a12 * s;
      mat[11] = a23 * c - a13 * s;

      return 0;
}