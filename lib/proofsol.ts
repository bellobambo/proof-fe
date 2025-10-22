/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/proofsol.json`.
 */
export type Proofsol = {
  "address": "2qijhn58A5Hwyqb2ivSsXddKqzeHD7pzz5CwLpMuhwjd",
  "metadata": {
    "name": "proofsol",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createCourse",
      "discriminator": [
        120,
        121,
        154,
        164,
        107,
        180,
        167,
        241
      ],
      "accounts": [
        {
          "name": "course",
          "writable": true,
          "signer": true
        },
        {
          "name": "lecturer",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "createExam",
      "discriminator": [
        247,
        135,
        105,
        245,
        128,
        52,
        23,
        97
      ],
      "accounts": [
        {
          "name": "exam",
          "writable": true,
          "signer": true
        },
        {
          "name": "lecturer",
          "writable": true,
          "signer": true
        },
        {
          "name": "course"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "date",
          "type": "i64"
        },
        {
          "name": "duration",
          "type": "i64"
        }
      ]
    },
    {
      "name": "enrollCourse",
      "discriminator": [
        99,
        88,
        16,
        143,
        40,
        253,
        22,
        47
      ],
      "accounts": [
        {
          "name": "enrollment",
          "writable": true,
          "signer": true
        },
        {
          "name": "student",
          "writable": true,
          "signer": true
        },
        {
          "name": "course"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "registerUser",
      "discriminator": [
        2,
        241,
        150,
        223,
        99,
        214,
        116,
        97
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "role",
          "type": {
            "defined": {
              "name": "userRole"
            }
          }
        }
      ]
    },
    {
      "name": "submitExam",
      "discriminator": [
        17,
        226,
        209,
        16,
        207,
        107,
        86,
        229
      ],
      "accounts": [
        {
          "name": "student",
          "writable": true,
          "signer": true
        },
        {
          "name": "exam"
        },
        {
          "name": "qa"
        },
        {
          "name": "result",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "studentAnswers",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "uploadQuestions",
      "discriminator": [
        19,
        184,
        168,
        251,
        219,
        38,
        239,
        69
      ],
      "accounts": [
        {
          "name": "qa",
          "writable": true,
          "signer": true
        },
        {
          "name": "lecturer",
          "writable": true,
          "signer": true
        },
        {
          "name": "exam"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "questions",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "answers",
          "type": {
            "vec": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "course",
      "discriminator": [
        206,
        6,
        78,
        228,
        163,
        138,
        241,
        106
      ]
    },
    {
      "name": "enrollment",
      "discriminator": [
        249,
        210,
        64,
        145,
        197,
        241,
        57,
        51
      ]
    },
    {
      "name": "exam",
      "discriminator": [
        217,
        124,
        206,
        150,
        202,
        222,
        128,
        5
      ]
    },
    {
      "name": "examOutcome",
      "discriminator": [
        183,
        24,
        97,
        94,
        46,
        13,
        112,
        210
      ]
    },
    {
      "name": "questionBank",
      "discriminator": [
        137,
        210,
        89,
        140,
        196,
        125,
        209,
        181
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "emptyCourseTitle",
      "msg": "Course title cannot be empty."
    },
    {
      "code": 6001,
      "name": "invalidExamDetails",
      "msg": "Invalid exam details."
    },
    {
      "code": 6002,
      "name": "invalidQuestionFormat",
      "msg": "Questions and answers must be non-empty and of equal length."
    },
    {
      "code": 6003,
      "name": "answerCountMismatch",
      "msg": "Student answers count does not match question count."
    }
  ],
  "types": [
    {
      "name": "course",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "lecturer",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "enrollment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "student",
            "type": "pubkey"
          },
          {
            "name": "course",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "exam",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "course",
            "type": "pubkey"
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "examOutcome",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "student",
            "type": "pubkey"
          },
          {
            "name": "exam",
            "type": "pubkey"
          },
          {
            "name": "score",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "questionBank",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exam",
            "type": "pubkey"
          },
          {
            "name": "questions",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "answers",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "role",
            "type": {
              "defined": {
                "name": "userRole"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userRole",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "lecturer"
          },
          {
            "name": "student"
          }
        ]
      }
    }
  ]
};
