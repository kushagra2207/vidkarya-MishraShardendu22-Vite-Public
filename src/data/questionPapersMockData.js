const questionPapersMockData = [
  {
    _id: 0,
    faculty: "Sunil Saumya Sir",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17tShIJ0QPb-_rmmZrypWNvz-XxZxvoWP/preview",
  },
  {
    _id: 1,
    faculty: "Anushree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17v_LA-A4yqRcJxr5XcI2fijmB2UyoHO-/preview",
  },
  {
    _id: 2,
    faculty: "Ramesh Athe Sir",
    subjectCode: "DS105",
    subjectName: "Probability and Statistics",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17rsD0yhLDgAUmCo5aQMiuOtgrYQC0UoU/preview",
  },
  {
    _id: 3,
    faculty: "Manjusha Ma'am",
    subjectCode: "HS102",
    subjectName: "Professional Communication",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/18U-y81yu9m0Sr4AcWoeRpeGfbF-ixtvh/preview",
  },
  {
    _id: 4,
    faculty: "Sunil Saumya Sir",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "Lab Exam",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17rLhZ8cnCo4oxAbQsibpqihV5JkLVQTj/preview",
  },
  {
    _id: 5,
    faculty: "Sunil Saumya Sir",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "Mid Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17nUFD8WLZMOcM-xInwauc0F0Wrd0c90Z/preview",
  },
  {
    _id: 6,
    faculty: "Anushree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "Mid Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17pfhqKEBaR13wSrVKBgsabvvy21wj0yk/preview",
  },
  {
    _id: 7,
    faculty: "Anushree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "Quiz-1",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17kv-vQvvQ-TQErKqOh1ktq-osRc2JHMo/preview",
  },
  {
    _id: 8,
    faculty: "Rajib Sir",
    subjectCode: "EG101",
    subjectName: "Engineering 101",
    type: "Mid Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17pSuJhiumqR8Kw9auhLsjQd8kCsXVepv/preview",
  },
  {
    _id: 9,
    faculty: "Ramesh Athe Sir",
    subjectCode: "DS105",
    subjectName: "Probability and Statistics",
    type: "Mid Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17l57mfUJib1BtyUNjcS6xdfUk5FqpvqC/preview",
  },
  {
    _id: 10,
    faculty: "Ramesh Athe Sir",
    subjectCode: "DS105",
    subjectName: "Probability and Statistics",
    type: "Quiz-2",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17q3Qg5F93QehFwmCWA8izdqCYcLsRmjM/preview",
  },
  {
    _id: 11,
    faculty: "Ramesh Athe Sir",
    subjectCode: "DS105",
    subjectName: "Probability and Statistics",
    type: "Quiz-1",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17czDz6gvMKngOXgWlxYe5Fza2I7Nq4MM/preview",
  },
  {
    _id: 12,
    faculty: "Manjusha Ma'am",
    subjectCode: "HS102",
    subjectName: "Professional Communication",
    type: "Mid Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17pye3w4uv7R2hkbjnZJY2_KgSX5ZqL4C/preview",
  },
  {
    _id: 13,
    faculty: "Rajendra Sir",
    subjectCode: "CS455",
    subjectName: "Blockchain Technology",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1uCgPF0kXHRRc9y9flhmdLY9yV_4oCrkm/preview",
  },
  {
    _id: 14,
    faculty: "Malay Sir",
    subjectCode: "CS356",
    subjectName: "Introduction to Virtualization and Cloud Computing",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1p8JjTxZ09VxfRloeYDKGAXYV3W-R625p/preview",
  },
  {
    _id: 15,
    faculty: "Natraj Sir",
    subjectCode: "CS458",
    subjectName: "Natural Language Processing",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1tmFqa3uiVMJXiJUpZKcXbYgBTaVCTQ1e/preview",
  },
  {
    _id: 16,
    faculty: "Amesh Sir",
    subjectCode: "DS351",
    subjectName: "Statistics For Health Technology",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1tEX2F3VQaDtXtUx8tbXjP2eO3trVV_KM/preview",
  },
  {
    _id: 17,
    faculty: "Amesh Sir",
    subjectCode: "DS351",
    subjectName: "Statistics For Health Technology",
    type: "Mid Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1tEFnGqnN8e-noUkrsVLdAvJ23s0I21Jk/preview",
  },
  {
    _id: 18,
    faculty: "Sunil Sir",
    subjectCode: "CS307",
    subjectName: "Machine Learning",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1tMg_jUdTObdZQnlhBKZup9CL5fALFJMc/preview",
  },
  {
    _id: 19,
    faculty: "Sunil Sir",
    subjectCode: "CS307",
    subjectName: "Machine Learning",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1tMg_jUdTObdZQnlhBKZup9CL5fALFJMc/preview",
  },
  {
    _id: 20,
    faculty: "Malay Sir",
    subjectCode: "CS356",
    subjectName: "Introduction to Virtualisation and Cloud Computing",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1tRERiYO8twcVO99CMIpJ9GCFtnxIxAR2/preview",
  },
  {
    _id: 21,
    faculty: "Malay Sir",
    subjectCode: "CS356",
    subjectName: "Introduction to Virtualisation and Cloud Computing",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1u2st2vw4l0GtKaaBjkduAz5zqSVdp3yq/preview",
  },
  {
    _id: 22,
    faculty: "Rajendra Sir",
    subjectCode: "CS455",
    subjectName: "BlockChain Technology",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1uCgPF0kXHRRc9y9flhmdLY9yV_4oCrkm/preview",
  },
  {
    _id: 23,
    faculty: "Rajendra Sir",
    subjectCode: "CS455",
    subjectName: "BlockChain Technology",
    type: "Mid Sem",
    year: "2019",
    resourceLink:
      "https://drive.google.com/file/d/1LTf9aMRr_DRcBpkUVHT0pWadzKT1Kkgm/preview",
  },
  {
    _id: 24,
    faculty: "Rajendra Sir",
    subjectCode: "CS455",
    subjectName: "BlockChain Technology",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1Katyn1ac18AmiAPVrgZRN9J_wfBnRQTH/preview",
  },
  {
    _id: 25,
    faculty: "Rajendra Sir",
    subjectCode: "CS455",
    subjectName: "BlockChain Technology",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1uFnJvYMAiBg009CR4Wn-PSqTyXj7Ow07/preview",
  },
  {
    _id: 26,
    faculty: "Malay Sir",
    subjectCode: "CS465",
    subjectName: "DevOps and Microservices",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1u0ydAK-tigv43TIiDx9ni91qBj3VeiOj/preview",
  },
  {
    _id: 27,
    faculty: "Sunil Sir",
    subjectCode: "CS307",
    subjectName: "Machine Learning",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1twG9zisMclQaJqyFANgcFmigjmacAdRN/preview",
  },
  {
    _id: 28,
    faculty: "Natraj Sir",
    subjectCode: "CS458",
    subjectName: "Natural Language Processing",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1tpdpOl5PWAYP_2wenU0ci7Zka4LzF8b2/preview",
  },
  {
    _id: 29,
    faculty: "Amesh Sir",
    subjectCode: "DS351",
    subjectName: "Statistics For Health Technology",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1tWRk8YLtdc5pOCSBbL4cCnn3HQnEWAG4/preview",
  },
  {
    _id: 30,
    faculty: "Amesh Sir",
    subjectCode: "DS351",
    subjectName: "Statistics For Health Technology",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1tXuMWjoHKBb1YyqQDsEqDCQrPehy_3Jz/preview",
  },
  {
    _id: 31,
    faculty: "Ashwath Sir",
    subjectCode: "PH451",
    subjectName: "Quantum Machine Learning",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1t_cnKgiAJYFJKKLMJ87kcelG80FgInWl/preview",
  },
  {
    _id: 32,
    faculty: "Ramesh Sir",
    subjectCode: "CS309",
    subjectName: "Statistics Of Computer Science",
    type: "End Sem",
    year: "2021",
    resourceLink:
      "https://drive.google.com/file/d/1SMC-V5mYR8QsI4pV9mC3epHxY5tTwH42/preview",
  },
  {
    _id: 32,
    faculty: "Ramesh Sir",
    subjectCode: "CS309",
    subjectName: "Statistics Of Computer Science",
    type: "End Sem",
    year: "2021",
    resourceLink:
      "https://drive.google.com/file/d/1SMC-V5mYR8QsI4pV9mC3epHxY5tTwH42/preview",
  },
  {
    _id: 33,
    faculty: "Ramesh Sir",
    subjectCode: "CS309",
    subjectName: "Statistics Of Computer Science",
    type: "Mid Sem",
    year: "2021",
    resourceLink:
      "https://drive.google.com/file/d/1uHeiyAFWpccxBiTDgIjVKVLSEFbPrpzg/preview",
  },
  {
    _id: 34,
    faculty: "Natraj Sir",
    subjectCode: "EC208",
    subjectName: "Introduction to Embedded Systems",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/11i_rjcYGtQnjMBq1EYoS4-jKpw-lRfX0/preview",
  },
  {
    _id: 35,
    faculty: "Natraj Sir",
    subjectCode: "EC208",
    subjectName: "Introduction to Embedded Systems",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1-r84Xn2_AXLJkrMhnrPd3aaXDZr0iXv9/preview",
  },
  {
    _id: 36,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA102",
    subjectName: "Differential Equations",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1aiq7ldbrLK0FMrddIwV_khXkv0FT5gVk/preview",
  },
  {
    _id: 37,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA102",
    subjectName: "Differential Equations",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1Ff3xomoFJfDfmyXh-7TrbCWrx9JIM38q/preview",
  },
  {
    _id: 38,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA102",
    subjectName: "Differential Equations",
    type: "Quiz1",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1HfD-rpAqRCzxSt5evbtLjh2IoLJuU4Se/preview",
  },
  {
    _id: 39,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA102",
    subjectName: "Differential Equations",
    type: "Quiz2",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1rosta59V660d2rr0MzLS4OH01QULgE0f/preview",
  },
  {
    _id: 40,
    faculty: "Ashwath Sir",
    subjectCode: "PH104",
    subjectName: "Physics for ECE",
    type: "Quiz2",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/17KBy7vF03aEeGmX2r1H0hmvIbmGCMUf9/preview",
  },
  {
    _id: 41,
    faculty: "Ashwath Sir",
    subjectCode: "PH104",
    subjectName: "Physics for ECE",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/132ij1KEQwt4KKn96fhWIMFgpX4D-nDLr/preview",
  },
  {
    _id: 42,
    faculty: "Ashwath Sir",
    subjectCode: "PH104",
    subjectName: "Physics for ECE",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/15dhfJDstc0nnuDQy-JkigUILOKrkzW9a/preview",
  },
  {
    _id: 43,
    faculty: "Vivek Raj Sir",
    subjectCode: "CS103",
    subjectName: "Programming and Data Structures",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/14aBIBHnnATnbxjWgYe8ocnW_jO9_EQMA/preview",
  },
  {
    _id: 44,
    faculty: "Vivek Raj Sir",
    subjectCode: "CS103",
    subjectName: "Programming and Data Structures",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1vbQ_BycB0GExL15S5wzbfta_gnnEVZ3j/preview",
  },
  {
    _id: 45,
    faculty: "Sibshankar Padhy Sir",
    subjectCode: "EC201",
    subjectName: "Digital Design",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1AoVCeBicTjAqVxIdtWK-V4n6GbcZUeiM/preview",
  },
  {
    _id: 46,
    faculty: "Sibshankar Padhy Sir",
    subjectCode: "EC201",
    subjectName: "Digital Design",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1leJim1WhLp9NOHP4DXVBEUZvxk06Er_v/preview",
  },
  {
    _id: 47,
    faculty: "Sibshankar Padhy Sir",
    subjectCode: "EC201",
    subjectName: "Digital Design",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1leJim1WhLp9NOHP4DXVBEUZvxk06Er_v/preview",
  },
  {
    _id: 48,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA101",
    subjectName: "Calculus",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1qpCJKLkQQxvyA4BUSVV4TZCx_YWVARTR/preview",
  },
  {
    _id: 49,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA101",
    subjectName: "Calculus",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1gG_Zq4KdiQSPiv5N1BAlTMuUdmcGJBLl/preview",
  },
  {
    _id: 50,
    faculty: "Somen Sir",
    subjectCode: "EG102",
    subjectName: "Basic Circuit Theory",
    type: "Mid Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/11pvxMoxLPmSAItz6kY_zJfUDi_VUB77g/preview",
  },
  {
    _id: 51,
    faculty: "Somen Sir",
    subjectCode: "EG102",
    subjectName: "Basic Circuit Theory",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1qS8bepnA8SkaGsw_K7IPMGsN8m5Kyl0h/preview",
  },
  {
    _id: 52,
    faculty: "Chandrika Ma'am",
    subjectCode: "HS103",
    subjectName: "Language and Communication",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1YV3M25y-t9tl28jop6bx5PpWm9Y1nYqk/preview",
  },
  {
    _id: 53,
    faculty: "Somen Sir",
    subjectCode: "EC203",
    subjectName: "Analog Electronics",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1ZotIZAZC2O9wEUNsKyEhxzAspdphYSi4/preview",
  },
  {
    _id: 54,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA102",
    subjectName: "Differential Equations",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1es-2A7PdXgOwOr-BTMdBqzq4tv0N5qhS/preview",
  },
  {
    _id: 55,
    faculty: "Natraj Sir",
    subjectCode: "EC208",
    subjectName: "Introduction to Embedded Systems",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1vnyZ0DQszLiqqYbktiD8bs6x5iGUhtfN/preview",
  },
  {
    _id: 56,
    faculty: "Navya Shree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1wA0vg_t3Aj7sIMsvxCD2s8Di58-rx7id/preview",
  },
  {
    _id: 57,
    faculty: "Chandrika Ma'am",
    subjectCode: "HS102",
    subjectName: "Professional Communication",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/1nGA2UL8rWElncoJqox4Jy7kNLaLG1FLC/preview",
  },
  {
    _id: 58,
    faculty: "Sibshankar Padhy Sir",
    subjectCode: "CS106",
    subjectName: "MPMC",
    type: "QUIZ_2",
    year: "2024",
    resourceLink:
      "https://drive.google.com/file/d/1iSYGHlyodFyucDQ-bf0KPtKa206DsrQn/preview",
  },
  {
    _id: 59,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA103",
    subjectName: "Maths",
    type: "QUIZ_2",
    year: "2024",
    resourceLink:
      "https://drive.google.com/file/d/1Q4AJmm04-PvyJRxuJpH-163Ip9UQ_5ee/preview",
  },
  {
    _id: 60,
    faculty: "Sibshankar Padhy Sir",
    subjectCode: "CS106",
    subjectName: "MPMC",
    type: "End Sem",
    year: "2023",
    resourceLink:
      "https://drive.google.com/file/d/15t7iPrGrhe7w6LFOg2Vn6_YfJXitzWUr/preview",
  },


  //////////////Yahan se start krna hai

  {
    _id: 61,
    faculty: "Unknown",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "End Sem",
    year: "2022",
    resourceLink:
      "https://drive.google.com/file/d/1UkjsqABT9ZFjFoVX0qv5XqVQOCOYDsVh/preview"
  },
  {
    _id: 62,
    faculty: "Prabhu Prasad Sir",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1_nFNgunMj4tii7HJSTUG8B8REmZyV9zZ/preview"
  },
  {
    _id: 63,
    faculty: "Unknown",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "End Lab",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1pevU9hKyL6L-RacwRqQpvgqU2WQyOU9e/preview"
  },
  {
    _id: 64,
    faculty: "Prabhu Prasad Sir",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1mDb6P_aTFGNaJ5c4ZTFzlvHLCw-O4xbX/preview"
  },
  {
    _id: 65,
    faculty: "Unknown",
    subjectCode: "CS102",
    subjectName: "Data Structures",
    type: "Quiz 2",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1SEAfRvJ43sp4oCDyZqIqY0hc9P9zP8ow/preview"
  },
  {
    _id: 66,
    faculty: "Unknown",
    subjectCode: "CS105",
    subjectName: "Problem Solving Through Programming",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1wzaBXfIYRQx5WEpGqXIUXQGxuD-6pP7B/preview"
  },
  {
    _id: 67,
    faculty: "Unknown",
    subjectCode: "CS105",
    subjectName: "Problem Solving Through Programming",
    type: "End Sem",
    year: "2023",
    resourceLink: 
      "https://drive.google.com/file/d/12FscP_VmoYcPolshXI58P2BnF5zAo5wB/preview"
  },
  {
    _id: 68,
    faculty: "Unknown",
    subjectCode: "CS105",
    subjectName: "Problem Solving Through Programming",
    type: "Lab",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1SwH20EPvpjmLm9-pTZdQGGKci1un3STh/preview"
  },
  {
    _id: 69,
    faculty: "Unknown",
    subjectCode: "CS105",
    subjectName: "Problem Solving Through Programming",
    type: "Mid Sem",
    year: "2023",
    resourceLink: 
      "https://drive.google.com/file/d/1oHTnnEkHprXeCcVmlo9AT8PMZi3RcvVe/preview"
  },
  {
    _id: 70,
    faculty: "Sibshankar Padhy Sir",
    subjectCode: "CS106",
    subjectName: "MPMC",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1AEbl7jCbKrcayvF6MMIbsx634ctP8QY4/preview"
  },
  {
    _id: 71,
    faculty: "Sadhvi Ma'am",
    subjectCode: "CS201",
    subjectName: "Discrete Mathematics",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1GAL145lv0Xdqq3yM5PlUNDVb_YHTIYEM/preview"
  },
  {
    _id: 72,
    faculty: "Sadhvi Ma'am",
    subjectCode: "CS201",
    subjectName: "Discrete Mathematics",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1QqsL-yLaFv1KTOieh-dfMPMY1n4og5Q6/preview"
  },
  {
    _id: 73,
    faculty: "Dibyajyoti Sir",
    subjectCode: "CS202",
    subjectName: "Design and Analysis of Algorithms",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1O0acaYc8S8Qigdal6e-jyENwnhjLVjf1/preview"
  },
  {
    _id: 74,
    faculty: "Dibyajyoti Sir",
    subjectCode: "CS202",
    subjectName: "Design and Analysis of Algorithms",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1O0acaYc8S8Qigdal6e-jyENwnhjLVjf1/preview"
  },
  {
    _id: 75,
    faculty: "Prabhu Prasad Sir",
    subjectCode: "CS208",
    subjectName: "Computer Architecture",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1wozZELwu0Dbl6ttRX5KBeA3h6GRkAbJg/preview"
  },
  {
    _id: 76,
    faculty: "Prabhu Prasad Sir",
    subjectCode: "CS208",
    subjectName: "Computer Architecture",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/11m1_JTnbGc3Rnfd0bSZXoLrmNDRjW2oK/preview"
  },
  {
    _id: 77,
    faculty: "Unknown",
    subjectCode: "EG101",
    subjectName: "Engineering 101",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1WyLIloFp36dgp754xGlYOP8hbCw8oux2/preview"
  },
  {
    _id: 78,
    faculty: "Chandrika Ma'am",
    subjectCode: "HS102",
    subjectName: "Professional Communication",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1G48nPhC83DM7Hqix9obBNaV6LpAh2sOP/preview"
  },
  {
    _id: 79,
    faculty: "Unknown",
    subjectCode: "HS102",
    subjectName: "Professional Communication",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1LXdjCOLBC2fJbttJvCINTjpqSl5bGBvT/preview"
  },
  {
    _id: 80,
    faculty: "Chandrika Ma'am",
    subjectCode: "HS103",
    subjectName: "Language and Communication",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1BQot5ljposO_R0IMc8t7tEDXpRFsJ_SZ/preview"
  },
  {
    _id: 81,
    faculty: "Chandrika Ma'am",
    subjectCode: "HS103",
    subjectName: "Language and Communication",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/15JnPw2tCtEBE5eu1RZPSX_I7doN7JXpE/preview"
  },
  {
    _id: 82,
    faculty: "Chandrika Ma'am",
    subjectCode: "HS103",
    subjectName: "Language and Communication",
    type: "Mid Sem",
    year: "2023",
    resourceLink: 
      "https://drive.google.com/file/d/1iSj1hKSqadB07XKrxMtsmXluJGAGc4sw/preview"
  },
  {
    _id: 83,
    faculty: "Navya Shree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1yT_P6GCYdEoxUKQGXVWElprQze8yGnLp/preview"
  },
  {
    _id: 84,
    faculty: "Navya Shree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1cXzk9oGlD80_bRmma3-PP_Re5qktdDhV/preview"
  },
  {
    _id: 85,
    faculty: "Navya Shree Ma'am",
    subjectCode: "HS206",
    subjectName: "Industrial Social Psychology",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1-Viszv0cz_rGPJu3KshVjwM2t46rZRLn/preview"
  },
  {
    _id: 86,
    faculty: "Navya Shree Ma'am",
    subjectCode: "HS206",
    subjectName: "Industrial Social Psychology",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1c851yopv6e5slyNJdIPJyLOmtJ32lOXu/preview"
  },
  {
    _id: 87,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA101",
    subjectName: "Calculus",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1wun7kZ80T-WcCA_-CeiWch8hPmkaFW8d/preview"
  },
  {
    _id: 88,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA101",
    subjectName: "Calculus",
    type: "Mid Sem",
    year: "2023",
    resourceLink: 
      "https://drive.google.com/file/d/1x1DWp99LaBCc9ZdvfID9Fsh8eguy6rNk/preview"
  },
  {
    _id: 89,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA103",
    subjectName: "Maths for CS",
    type: "End Sem",
    year: "2022",
    resourceLink: 
      "https://drive.google.com/file/d/1g4rCFY-dLDlvcyrhQyZX9QcZRyElXZjP/preview"
  },
  {
    _id: 90,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA103",
    subjectName: "Maths for CS",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1qYaPUWEcg-ZxtZminr04hlPOeypi1G7v/preview"
  },
  {
    _id: 91,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA103",
    subjectName: "Maths for CS",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1vv4V41oTGGGBUlPXVTSUj2b8T1uXBTvd/preview"
  },
  {
    _id: 92,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA103",
    subjectName: "Maths for CS",
    type: "Quiz 1",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1sl8FZmFdQq37udcO0Yf_qGUVBsNReE2J/preview"
  },
  {
    _id: 93,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA103",
    subjectName: "Maths for CS",
    type: "Quiz 2",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1UZ14bSM2ZRCxfY1E1OH94DMVgVzD5B_r/preview"
  },
  {
    _id: 94,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA201",
    subjectName: "Probability",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/18cmQuz7qOYkKkgwDDcXjBfoHrFkDTtcX/preview"
  },
  {
    _id: 95,
    faculty: "Anand Barangi Sir",
    subjectCode: "MA201",
    subjectName: "Probability",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1SkbM5z5V9U78-KmEnujefQkh_HNmDM_B/preview"
  },
  {
    _id: 96,
    faculty: "Aswath Sir",
    subjectCode: "PH105",
    subjectName: "Physics for IT",
    type: "Mid Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1qYmpNiyIlRuIOKFSieDiRvogtTMGqYO-/preview"
  },
  {
    _id: 97,
    faculty: "Aswath Sir",
    subjectCode: "PH105",
    subjectName: "Physics for IT",
    type: "End Sem",
    year: "2024",
    resourceLink: 
      "https://drive.google.com/file/d/1QcNnPgyuQBwymnNcHpDEzC-oe8KuDtH7/preview"
  },
  {
    _id: 98,
    faculty: "Unknown",
    subjectCode: "MA101",
    subjectName: "Calculus",
    type: "End Sem",
    year: "2021-22",
    resourceLink: 
      "https://drive.google.com/file/d/1AVdRbL9SUYno46ucKIlu80ANOVRQzIiN/preview"
  },
  {
    _id: 99,
    faculty: "Navya Shree Ma'am",
    subjectCode: "HS204",
    subjectName: "Economics",
    type: "Mid Sem",
    year: "2023",
    resourceLink: 
      "https://drive.google.com/file/d/1APv92KOrTsSe8eeWt7PO9qIWTYYakoYn/preview"
  }
];

export default questionPapersMockData;
