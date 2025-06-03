const projects = [
  {
    key: "polymaker",
    title: "Polymaker Website",
    subtitle: "Interactive Web Applications",
    meta: {
      Industry: "3D Printing / E-Commerce",
      Published: "©2025",
      "Live Site": `<a href="https://polymaker.com" target="_blank">polymaker.com</a>`,
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
    title: "Legal Contract Analyzer",
    subtitle: "Hackathon Winning On-Device AI Tool",
    meta: {
      Industry: "Legal Tech",
      Published: "December 2024",
      Hackathon: "Qualcomm Snapdragon × LM Studio AI Builder (1st Place)",
      Deliverables: "FastAPI Backend, Jinja2 UI, OpenAI Python SDK Integration",
    },
    sections: [
      {
        heading: "Overview",
        text: "A secure, offline application that automates legal-document analysis covering contract review, case simulation, and IP management, while ensuring complete data privacy by running entirely on-device. Originally developed for the Qualcomm Snapdragon × LM Studio On-Device AI Builder Hackathon (where it won first place), it leverages the Snapdragon X Elite’s NPUs to deliver fast, reliable risk assessments and document summaries without ever sending data to the cloud.",
      },
      {
        heading: "Key Features",
        text:
          "• Clause Extraction & Risk Analysis: Automatically breaks documents into numbered clauses, sends each clause through the OpenAI SDK for risk-level evaluation, and computes an overall risk score based on weighted legal keywords.\n\n" +
          "• Document Summarization: Generates a concise, examples-driven summary of the entire contract, highlighting which party benefits most.\n\n" +
          "• Multi-Format Parsing: Reads DOCX (via python-docx), PDF (via PyPDF2), and plain-text files natively.\n\n" +
          "• On-Device Privacy: Everything runs locally, no external calls beyond the on-device AI endpoint—ensuring sensitive legal data never leaves the machine.",
      },
      {
        heading: "Tech Stack",
        text:
          "• Backend: FastAPI (endpoints, file upload)\n\n" +
          "• Templating: Jinja2 for a minimal frontend UI\n\n" +
          "• AI Integration: OpenAI Python SDK for clause- and document-level analysis\n\n" +
          "• Parsing: python-docx (DOCX), PyPDF2 (PDF), built-in text handling for plain-text\n\n" +
          "• Configuration: python-dotenv for loading API keys and model IDs\n\n" +
          "• Runtime: Uvicorn (ASGI server)\n\n" +
          "Skills Demonstrated: Artificial Intelligence, Python, Web Applications, AI Software Development, On-Device ML Integration.",
      },
    ],
    image: ["assets_mac/qcom.png", "assets_mac/qcom1.png"],
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
    key: "hinge_matchmaker_robot",
    title: "Hinge Matchmaker Robot",
    subtitle: "Arduino-Powered Automated Swiper",
    meta: {
      Platform: "Arduino Uno/Nano",
      Languages: "Arduino C++",
      Tools: "Servos, Aluminum Foil, Photoresistor",
      "Skills Demonstrated":
        "Embedded Systems, Mechanical Design, Sensor Integration",
    },
    sections: [
      {
        heading: "Overview",
        text: "A playful Arduino‐powered gadget that automatically “swipes” left/right and taps “Heart” and “Send Like” on Hinge profiles using servo‐driven foil pads. Designed to run entirely on‐device for a whimsical take on automated dating.",
      },
      {
        heading: "Firmware & Electronics",
        text:
          "• Arduino C++ Firmware: Controls three servos and reads a light sensor to trigger random swipe cycles.  \n\n" +
          "• Servo‐Foil Touch Hack: Soldered positive leads to aluminum foil so the capacitive screen registers each tap reliably without requiring direct human contact.  \n\n" +
          "• Sensor Integration: Photoresistor triggers the swipe routine when ambient light indicates the phone is in place, ensuring the robot only activates when positioned correctly.",
      },
      {
        heading: "Mechanical Design",
        text:
          "• Custom 3D‐Printed Enclosure: Holds servos, foil pads, and sensor precisely above a smartphone for consistent alignment and reliable taps.  \n\n" +
          "• Mechanical Calibration: Tuned servo pulse widths and delays to mimic human finger taps without slipping. Adjusted foil pad placement and enclosure tolerances for consistent touchscreen interaction.",
      },
    ],
    image: [
      "assets_mac/HingeRobot/h1.jpg",
      "assets_mac/HingeRobot/Sequence 01_1 (1).gif",
    ],
  },

  {
    key: "parallel",
    title: "Parallel Computing Projects",
    subtitle: "OpenMP & MPI Labs",
    meta: {
      Language: "C (GCC 9.3)",
      Platform: "Ubuntu 20.04, 8-core Intel CPU / Linux MPI Cluster",
      Tools: "OpenMP 4.5, OpenMPI 4.0",
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
