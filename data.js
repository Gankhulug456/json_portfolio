const projects = [
  {
    key: "polymaker",
    title: "Polymaker Website",
    subtitle: "Interactive Web Applications",
    meta: {
      Industry: "3D Printing / E-Commerce",
      Published: "©2025",
      "Live Sites": `<a href="https://polymaker.com" target="_blank">polymaker.com</a> • <a href="https://fiberon.polymaker.com" target="_blank">fiberon.polymaker.com</a> • <a href="http://panchroma.polymaker.com/" target="_blank">panchroma.polymaker.com</a>`,
      Deliverables: "JavaScript/HTML/CSS, Custom Web Apps",
    },
    sections: [
      {
        heading: "Panchroma Interactive Custom Color Picker APP",
        text: "For the Polymaker Panchroma Filament launch showcase, I developed interactive applications for the website to enhance user engagement. One of the key applications I worked on was the Color App. Initially, I aimed to create a unique approach, but after numerous experiments with JavaScript, we decided to refine and develop the current version. The app’s primary purpose is to let users explore how Panchroma’s filament colors look across different surface finishes, showcasing the versatility of the product. This was an extensive project, involving over 150 colors applied to various surface finishes. I had to ensure that each color and finish combination was represented, effectively showcasing the diversity and vibrancy of the Panchroma Filament series.",
      },
      {
        heading: "Fiberon Interactive APP",
        text: "For the Polymaker Fiberon Filament family, I developed interactive material comparison graphs to highlight the professional-grade, high-performance filaments designed for advanced applications. These graphs were pure web implementations, built entirely using JavaScript, HTML, and additional frameworks. The graphs allow users to compare multiple filaments simultaneously, examining various material properties. Users can toggle between specific materials or view all options at once, creating a flexible and intuitive way to explore Fiberon’s capabilities. This project not only emphasized technical precision but also showcased my ability to create user-friendly tools for presenting complex data interactively.",
      },
    ],
    image: [
      "assets_mac/color_app_la2-min.png",
      "assets_mac/mat_com_lap1-min.png",
    ],
  },

  {
    key: "legal_contract-analyzer",
    title: "On-Device Legal Contract Analyzer",
    subtitle: "Hackathon Winning On-Device AI Tool",
    meta: {
      Industry: "Legal Tech",
      Published: "December 2024",
      Github: `<a href="https://github.com/Gankhulug456/Qualcomm-Hackathon" target="_blank">Visit on Github</a>`,
      Award: "1st Place – On-Device AI Builders Hackathon (Qualcomm × Microsoft × LM Studio)",
      "Official Blog": `<a href="https://www.qualcomm.com/developer/blog/2024/12/on-device-ai-builders-hackathon-qualcomm-lmstudio-microsoft" target="_blank">Qualcomm Developer Blog</a>`,
      "Q&A Video": `<a href="https://www.youtube.com/watch?v=v513FoIXxWk" target="_blank">YouTube Q&A with Qualcomm</a>`,
      Deliverables: "Python, LM Studio, Llama 3.1, ONNX Runtime, Local LLMs",
    },
    sections: [
      {
        heading: "Overview",
        text: "Developed an on-device legal document analyzer using LM Studio, Llama 3.1, and ONNX Runtime with 92% accuracy, winning 1st place at the On-Device AI Builders Hackathon (Qualcomm × Microsoft × LM Studio). Built a privacy-first AI agent to classify contract risk on-device, eliminating cloud dependency. Optimized inference pipelines to <200 ms per document (10x faster than baseline).",
      },
      {
        heading: "Key Features",
        text:
          "• On-Device AI Processing: Leverages LM Studio and Llama 3.1 for local inference, ensuring complete data privacy with no cloud dependency.\n\n" +
          "• High Accuracy: Achieved 92% accuracy in contract risk classification and analysis.\n\n" +
          "• Optimized Performance: Inference pipelines optimized to <200 ms per document, 10x faster than baseline implementations.\n\n" +
          "• Privacy-First Design: All processing happens on-device using ONNX Runtime, ensuring sensitive legal data never leaves the machine.",
      },
      {
        heading: "Tech Stack",
        text:
          "• AI/ML: LM Studio, Llama 3.1, ONNX Runtime, Local LLMs\n\n" +
          "• Language: Python\n\n" +
          "• Optimization: ONNX Runtime for efficient model inference\n\n" +
          "Skills Demonstrated: On-Device AI, Local LLMs, Python, ONNX Runtime, Privacy-Preserving AI, Model Optimization.",
      },
    ],
    image: ["assets_mac/qcom.png", "assets_mac/qcom1.png"],
  },
  {
    key: "nomadly",
    title: "Nomadly",
    subtitle: "AI-Powered Job Matching Platform",
    meta: {
      Industry: "Job Matching / AI",
      Published: "2024",
      "Live Site": `<a href="https://intern.nomadli.app" target="_blank">intern.nomadli.app</a>`,
      Tech: "React, Next.js, Firebase/Firestore, Python, Vector Embeddings, RAG, Node.js",
      Deliverables: "Full-Stack Application with AI Integration",
    },
    sections: [
      {
        heading: "Overview",
        text: "Built an AI-powered job matching platform using RAG (Retrieval-Augmented Generation) with vector embeddings and cosine similarity, delivering personalized job recommendations. Developed a scalable multi-role application with secure Firestore rules and application tracking, serving students, organizations, and administrators.",
      },
      {
        heading: "Key Features",
        text:
          "• AI-Powered Matching: Implemented RAG with vector embeddings and cosine similarity to provide personalized job recommendations based on user profiles and preferences.\n\n" +
          "• Multi-Role System: Built a comprehensive platform supporting three distinct user roles—students, organizations, and administrators—each with tailored functionality and permissions.\n\n" +
          "• Secure Data Management: Implemented secure Firestore rules to ensure proper access control and data protection across all user roles.\n\n" +
          "• Application Tracking: Developed a complete application tracking system allowing users to monitor their job application status and history.",
      },
      {
        heading: "Tech Stack",
        text:
          "• Frontend: React, Next.js\n\n" +
          "• Backend: Node.js, Python\n\n" +
          "• Database: Firebase/Firestore\n\n" +
          "• AI/ML: Vector Embeddings, RAG (Retrieval-Augmented Generation), Cosine Similarity\n\n" +
          "Skills Demonstrated: Full-Stack Development, React, Next.js, Firebase, Vector Databases, RAG, AI/ML Integration, Multi-Role Applications.",
      },
    ],
    image: [
      "assets_mac/Nomadly/Promo.png",
      "assets_mac/Nomadly/Nomadly Promo Professional Phone Mockup.png",
      "assets_mac/Nomadly/1.png",
      "assets_mac/Nomadly/2.png",
      "assets_mac/Nomadly/3.png",
    ],
  },

  {
    key: "logisim_register_alu",
    title: "4-Bit Register + ALU",
    subtitle: "Logisim-Evolution Digital Design",
    meta: {
      Tool: "Logisim-Evolution",
      Course: "Computer Systems Organization",
    },
    sections: [
      {
        heading: "Design Overview",
        text: "Designed a full 4-bit register and ALU chain in Logisim-Evolution, supporting add/subtract, AND/OR, and carry-lookups, then pipelined the result into an output register for stable reads.",
      },
      {
        heading: "Implementation Details",
        text:
          "• Used edge-triggered flip-flops (via a four-bit register component) with write-enable and clock controls.\n\n" +
          "• Built a 4-bit ALU (four_bit_alu) that handles C_in, C_out, and bitwise operations (AND, OR, ADD, SUB).\n\n" +
          "• Chained the ALU result back into a second register to emulate a CPU-style pipeline stage, ensuring that every operation writes back only on the rising clock edge.\n\n" +
          "• Verified functionality by toggling control lines, observing correct sum/difference outputs, and checking C_out for overflow detection.",
      },
    ],
    image: [
      "assets_mac/Four bit ALU/alu.png",
      "assets_mac/Four bit ALU/alugif (1).gif",
    ],
  },

  {
    key: "arduino_midi_controller",
    title: "Arduino MIDI Controller & Sensor Interface",
    subtitle: "Personal DJ MIDI Controller",
    meta: {
      Platform: "Arduino Nano",
      Languages: "Arduino C++, JavaScript",
      Tools: "Blender (PCB Layout), WebSerial API",
      "Skills Demonstrated":
        "Embedded Systems, Soldering, Frontend Integration",
      Github: `<a href="https://github.com/Gankhulug456/Arduino-MIDI-Controller" target="_blank">Visit on Github</a>`,
    },
    sections: [
      {
        heading: "Hardware & Firmware",
        text: "Built an Arduino Nano-based MIDI controller that reads potentiometer knobs and debounced buttons, then sends MIDI messages over USB to a Tone.js synth. Integrated a photoresistor sensor input to adjust filter cutoff in real time. Developed the firmware in Arduino C++, handling analog-to-digital conversion for each knob and hardware debouncing for reliable button-triggered note events. Designed a small PCB layout in Blender, soldered all components onto the board, and added RGB LEDs to provide visual feedback as parameters changed.",
      },
      {
        heading: "Web Integration",
        text: "Utilized the WebSerial API in JavaScript to read live MIDI values from the Arduino in the browser. Mapped incoming MIDI control change messages to synth parameters in Tone.js, enabling instant audio feedback in the browser. This end-to-end workflow—from physical knob turn to on-screen synth response—demonstrated seamless hardware-to-software interaction.",
      },
    ],
    image: [
      "assets_mac/dj/dj.jpg",
      "assets_mac/dj/dj1.png",
      "assets_mac/dj/djmov.gif",
    ],
  },
  {
    key: "personnel_manager_bst",
    title: "Personnel Manager",
    subtitle: "Binary Search Tree-Based Personnel Record System",
    meta: {
      Platform: "C (CLI)",
      Languages: "C",
      Tools: "GCC, Makefile",
      "Skills Demonstrated":
        "Data Structures, Pointer Management, Memory Allocation, Binary Search Trees, Linked Lists",
      Github: `<a href="https://github.com/Gankhulug456/Personnel-Manager" target="_blank">Visit on Github</a>`,
    },
    sections: [
      {
        heading: "Overview",
        text: "A command-line personnel management system that stores and organizes employee records using Binary Search Trees (BSTs) for four sorting criteria: name, ID number, age, and salary. Records can be input dynamically, printed in sorted order, and traversed in a doubly linked list format for flexible display.",
      },
      {
        heading: "System Design",
        text:
          "• Record Structure: Each personnel record includes name (first, last, middle initial), age, salary, and ID. Memory is dynamically allocated for strings to ensure scalability.  \n\n" +
          "• BST Implementation: Four separate BSTs store the same records sorted by different criteria (name, age, salary, ID), enabling multi-perspective traversal.  \n\n" +
          "• Inorder Traversal: Allows sorted printing of each BST by its respective key, supporting efficient organization and comparison.",
      },
      {
        heading: "Linked List Integration",
        text:
          "• List Conversion: Converts the BST (sorted by name) into a doubly linked list to enable forward and backward iteration.  \n\n" +
          "• Circular Display: Allows printing of a specified number of records, wrapping around the list when reaching the end, useful for limited previews in real-time systems.",
      },
    ],
    image: ["assets_mac/Preview.png"],
  },
  {
    key: "parallel",
    title: "Parallel Computing Projects",

    subtitle: "OpenMP & MPI Labs",
    meta: {
      Language: "C (GCC 9.3)",
      Platform: "Ubuntu 20.04, 8-core Intel CPU / Linux MPI Cluster",
      Tools: "OpenMP 4.5, OpenMPI 4.0",
      Github: `<a href="https://github.com/Gankhulug456/parallel_computing" target="_blank">Visit on Github</a>`,
    },
    sections: [
      {
        heading: "OpenMP Prime Finder",
        text:
          "A multi-threaded Sieve of Eratosthenes that computes all primes in [M, N] using OpenMP, achieving near-linear speedup on an 8-core CPU.\n\n" +
          "• Language & Tools: C (compiled with GCC 9.3 using –fopenmp) on Ubuntu 20.04 running an 8-core Intel CPU.\n\n" +
          "• Parallel Strategy: Each thread maintains its own private list of found primes (called `prime_loc`) and then merges them into the global array within a critical section. I used `#pragma omp parallel` and `#pragma omp for` to distribute the range [M..N] across threads.\n\n" +
          "• Challenges & Optimizations: To avoid false sharing, each thread writes to its own buffer (`prime_loc`). Results are merged inside a `#pragma omp critical` section to prevent race conditions. I also optimized the sieve loop so that each candidate x is tested only against divisors ≤ √x.\n\n" +
          "```c\n",
      },
      {
        heading: "MPI Histogram Builder",
        text:
          "Generates a histogram of random floats in [0, 20) by distributing data across multiple MPI ranks, then performing a reduction.\n\n" +
          "• Language & Tools: C (compiled with GCC 9.3), OpenMPI 4.0 on a Linux cluster of 4 nodes.\n\n" +
          "• Parallel Strategy: Rank 0 generates N random floats uniformly in [0, 20). The data is split roughly equally (with the first N mod P ranks receiving one extra element) and distributed via `MPI_Send` (for ranks > 0) or copied directly into rank 0’s local buffer. Each rank builds its own local histogram (an integer array of length num_bins), and the global histogram is formed with `MPI_Reduce(local_bins, bins, num_bins, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD)`.\n\n" +
          "• Challenges & Optimizations: To handle non-even splits, I gave the first (N mod P) ranks one extra element. I used `MPI_Barrier` and `MPI_Wtime` to measure only the parallel section (excluding data generation). Correctness was verified by comparing the MPI result against a serial reference histogram.\n\n" +
          "Because the problem size is small, the performance curve fluctuates as you add threads. Spawning threads incurs significant cost, and synchronization overhead—especially around any `#pragma omp critical` sections—becomes dominant. As a result, adding more threads can actually degrade performance, matching the speed-up behavior discussed in lecture slides.\n\n" +
          "Because the input size is large, adding more threads improves performance. The workload is distributed more effectively, allowing each process to handle a portion of the data and speeding up the program. This aligns with the lecture’s discussion on scalability and parallel speed-up.",
      },
    ],
    image: [
      "assets_mac/parallel_computing/A.jpg",
      "assets_mac/parallel_computing/openmp.jpg",
      "assets_mac/parallel_computing/A_his.jpg",
      "assets_mac/parallel_computing/A_his2.jpg",
    ],
  },
];
