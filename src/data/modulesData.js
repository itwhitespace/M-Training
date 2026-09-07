// Data definitions for M-Training Digital Citizenship (UNESCO Competency Framework)

export const FLOW_STEPS = [
  {
    id: 'onboarding',
    stepNumber: 1,
    title: 'Onboarding & Dashboard',
    shortTitle: 'หน้า 1: ภาพรวมการเรียน',
    desc: 'คู่มือการอบรม แนะนำแนวทางการเรียน 3 สัปดาห์ และการประเมินผล',
    unescoDomain: 'General ICT Competency',
    mosherLevel: 'Level 1-2 (Learn & Apply)',
    iconName: 'Compass',
    color: 'from-blue-500 to-indigo-600',
    pathColor: '#3b82f6'
  },
  {
    id: 'module-1',
    stepNumber: 2,
    title: 'Module 1: Digital Safety & Legal Risk',
    shortTitle: 'หน้า 2: ความปลอดภัยและกฎหมายดิจิทัล',
    desc: 'กฎหมาย PDPA, สิทธิความเป็นส่วนตัวของครูและนักเรียน, จรรยาบรรณการแชร์รูปภาพ',
    unescoDomain: 'Domain 1: Digital Safety & Privacy',
    mosherLevel: 'Level 2: Apply (ประยุกต์ใช้ในชั้นเรียน)',
    iconName: 'ShieldAlert',
    color: 'from-amber-500 to-red-600',
    pathColor: '#f59e0b'
  },
  {
    id: 'module-2',
    stepNumber: 3,
    title: 'Module 2: Emotional Intelligence & Well-being',
    shortTitle: 'หน้า 3: สุขภาวะและความฉลาดทางอารมณ์',
    desc: 'สุขภาวะดิจิทัล การสร้าง Work-Life Balance และการจัดการภาวะ Mental Burnout ของครู',
    unescoDomain: 'Domain 2: Digital Well-being & Balance',
    mosherLevel: 'Level 3: Solve (แก้ไขปัญหาเมื่อเกิดวิกฤต)',
    iconName: 'HeartPulse',
    color: 'from-emerald-500 to-teal-600',
    pathColor: '#10b981'
  },
  {
    id: 'module-3',
    stepNumber: 4,
    title: 'Module 3: Digital Creativity & Innovation',
    shortTitle: 'หน้า 4: การสร้างสรรค์และนวัตกรรมดิจิทัล',
    desc: 'ทักษะและแนวทางการสร้างสรรค์นวัตกรรมการสอน ยุคดิจิทัล (TPACK / SAMR Framework)',
    unescoDomain: 'Domain 3: Digital Pedagogy & Innovation',
    mosherLevel: 'Level 2: Apply (ประยุกต์ใช้สื่อนวัตกรรม)',
    iconName: 'Sparkles',
    color: 'from-violet-500 to-purple-600',
    pathColor: '#8b5cf6'
  },
  {
    id: 'module-4',
    stepNumber: 5,
    title: 'Module 4: Digital Participation & Agency',
    shortTitle: 'หน้า 5: การมีส่วนร่วมและอัตลักษณ์ครูดิจิทัล',
    desc: 'การวางตัว ภาพลักษณ์ทางวิชาชีพบนสังคมออนไลน์ และการเป็นพลเมืองดิจิทัลต้นแบบ',
    unescoDomain: 'Domain 4: Professional Engagement & Ethics',
    mosherLevel: 'Level 3: Solve (นำการเปลี่ยนแปลงเชิงบวก)',
    iconName: 'Globe',
    color: 'from-cyan-500 to-blue-600',
    pathColor: '#06b6d4'
  },
  {
    id: 'assessment',
    stepNumber: 6,
    title: 'Assessment & Competency Evaluation',
    shortTitle: 'หน้า 6: การประเมินสมรรถนะหลังเรียน',
    desc: 'แบบฝึกหัดย่อย มินิเกมทบทวนความรู้ และแบบประเมินสมรรถนะรวม (Post-test) เพื่อรับใบรับรอง',
    unescoDomain: 'Evaluation & Certification',
    mosherLevel: 'Competency Mastered',
    iconName: 'Award',
    color: 'from-amber-400 to-orange-500',
    pathColor: '#f59e0b'
  }
];

export const MODULES_CONTENT = {
  'module-1': {
    id: 'module-1',
    title: 'Digital Safety & Legal Risk',
    subtitle: 'ความปลอดภัย สิทธิความเป็นส่วนตัว และกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)',
    duration: 'สัปดาห์ที่ 1 • ใช้เวลาประมาณ 45 นาที',
    unescoCompetency: 'ความเข้าใจด้านกฎหมายดิจิทัล การปกป้องข้อมูลนักเรียน และการบริหารจัดการความเสี่ยงทางออนไลน์',
    mosherConcept: 'Mosher Level 2 (Apply): นำหลัก PDPA ไปสร้างแนวปฏิบัติในการเผยแพร่ผลงานภาพถ่ายในโรงเรียน',
    
    // 1. Infographic Cards
    infographics: [
      {
        id: 'info-1-1',
        title: 'PDPA ในสถานศึกษา: ครูต้องรู้อะไรบ้าง?',
        type: 'slide',
        summary: 'หลักการสำคัญ 3 ประการในการจัดการข้อมูลส่วนบุคคลของนักเรียนและผู้ปกครอง',
        items: [
          { label: '1. การขอความยินยอม (Consent)', detail: 'ต้องได้รับความยินยอมจากผู้ปกครองก่อนเผยแพร่ภาพถ่ายเด็กอายุไม่ถึง 10 ปี หรือรูปที่เห็นใบหน้านักเรียนชัดเจน' },
          { label: '2. ขอบเขตวัตถุประสงค์ (Purpose)', detail: 'ใช้ข้อมูลเพื่อการส่งเสริมการเรียนรู้เท่านั้น ห้ามนำไปใช้เชิงพาณิชย์ หรือนอกเหนือจากภารกิจของโรงเรียน' },
          { label: '3. สิทธิได้รับการถูกลืม (Right to be Forgotten)', detail: 'หากผู้ปกครองหรือนักเรียนแจ้งลบรูป/ข้อมูล โรงเรียนและครูต้องดำเนินการลบโดยทันที' }
        ],
        badge: 'กฎหมายคุ้มครองข้อมูล',
        bgGradient: 'from-slate-900 to-amber-950/40'
      },
      {
        id: 'info-1-2',
        title: 'Checklist: การโพสต์รูปนักเรียนลง Social Media',
        type: 'checklist',
        summary: 'ข้อควรเช็ค 4 ข้อก่อนกด "Share" บน Facebook หรือ TikTok ของครู',
        items: [
          { label: 'เบลอใบหน้านักเรียน/ป้ายชื่อโรงเรียน', ok: true, detail: 'เพื่อลดความเสี่ยงจากการติดตามของมิจฉาชีพ' },
          { label: 'ไม่โพสต์ภาพเด็กในสภาวะเปราะบาง', ok: true, detail: 'เช่น เด็กกำลังร้องไห้ เสียขวัญ หรือแต่งกายไม่เรียบร้อย' },
          { label: 'ปิดระบุพิกัดสถานที่ (Geotagging)', ok: true, detail: 'ป้องกันผู้ไม่ประสงค์ดีทราบตำแหน่งจริงของเด็ก' },
          { label: 'หลีกเลี่ยงการติดแท็กชื่อจริงนักเรียน', ok: true, detail: 'ปกป้องรอยเท้าดิจิทัล (Digital Footprint) ของเด็ก' }
        ],
        badge: 'แนวปฏิบัติในชั้นเรียน',
        bgGradient: 'from-slate-900 to-rose-950/40'
      }
    ],

    // 2. Video Player Component
    video: {
      id: 'vid-m1',
      title: 'กรณีศึกษา: PDPA และความเสี่ยงทางกฎหมายของครูยุคดิจิทัล',
      durationStr: '01:45',
      durationSeconds: 105,
      posterUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
      description: 'วิดีโอจำลองสถานการณ์จริงเมื่อครูถ่ายคลิปบรรยากาศการสอนลง TikTok แล้วติดภาพนักเรียนที่มีประเด็นความคุ้มครอง',
      keyTimestamps: [
        { time: '00:15', label: 'จุดเริ่มต้นสถานการณ์คลิปไวรัล' },
        { time: '00:50', label: 'ผลกระทบด้านกฎหมาย PDPA มาตรา 24' },
        { time: '01:25', label: 'แนวทางแก้ไขและข้อตกลงร่วมในโรงเรียน' }
      ]
    },

    // 3. External Resources Link
    resources: [
      {
        id: 'res-1-1',
        title: 'คู่มือ PDPA สำหรับครูและบุคลากรทางการศึกษา (ฉบับย่อ)',
        format: 'PDF',
        size: '2.4 MB',
        linkText: 'ดาวน์โหลดคู่มือ PDF',
        url: '#'
      },
      {
        id: 'res-1-2',
        title: 'แบบฟอร์มหนังสือยินยอม (Consent Form) จากผู้ปกครอง',
        format: 'DOCX',
        size: '150 KB',
        linkText: 'ดาวน์โหลดแบบฟอร์ม',
        url: '#'
      }
    ],

    // 4. Interactive Quiz Component
    quiz: [
      {
        id: 'q1-1',
        question: 'กรณีใดต่อไปนี้ ครูถือว่าเสี่ยงขัดต่อกฎหมาย PDPA และจรรยาบรรณดิจิทัลมากที่สุด?',
        options: [
          'ก) ถ่ายภาพบรรยากาศห้องเรียนมุมกว้าง ไม่เห็นใบหน้านักเรียนชัดเจน เพื่อทำรายงานส่ง ผอ.',
          'ข) ถ่ายคลิปวิดีโอนักเรียนที่ทำสอบไม่ได้และกำลังร้องไห้ โพสต์ลง TikTok ส่วนตัวพร้อมแคปชันตลกขบขัน',
          'ค) เบลอหน้าเด็กก่อนโพสต์ภาพกิจกรรมวันเด็กในเพจประชาสัมพันธ์โรงเรียน',
          'ง) แจ้งผู้ปกครองในไลน์กลุ่มเรื่องการขอถ่ายภาพกิจกรรมทำบุญโรงเรียน'
        ],
        correctAnswer: 1,
        explanation: 'การถ่ายภาพนักเรียนในสภาวะเปราะบาง (ร้องไห้) แล้วนำไปโพสต์ลงสื่อส่วนตัวเพื่อความบันเทิง ถือเป็นการละเมิดสิทธิเด็ก และขัดต่อกฎหมาย PDPA รวมถึงจรรยาบรรณวิชาชีพครูอย่างรุนแรง'
      },
      {
        id: 'q1-2',
        question: 'หากผู้ปกครองแจ้งครูว่า ไม่ต้องการให้รูปบุตรหลานปรากฏในเพจโรงเรียน ครูควรดำเนินการอย่างไรเป็นอันดับแรก?',
        options: [
          'ก) อธิบายว่า เป็นกิจกรรมโรงเรียน ทุกคนต้องลงภาพได้',
          'ข) ดำเนินการลบรูปภาพ หรือเบลอใบหน้าเด็กในภาพนั้นโดยทันทีตามสิทธิความเป็นส่วนตัว',
          'ค) บล็อกผู้ปกครองคนดังกล่าวออกจากเพจโรงเรียน',
          'ง) แนะนำให้ผู้ปกครองไปร้องเรียนกับกระทรวงดิจิทัลฯ'
        ],
        correctAnswer: 1,
        explanation: 'ตามหลัก PDPA เจ้าของข้อมูลส่วนบุคคล (หรือผู้ปกครองของเด็ก) มีสิทธิถอนความยินยอมและขอให้ลบข้อมูล ครูและโรงเรียนต้องปฏิบัติตามโดยทันที'
      }
    ]
  },

  'module-2': {
    id: 'module-2',
    title: 'Emotional Intelligence & Well-being',
    subtitle: 'การสร้างสมดุลชีวิตและสุขภาวะดิจิทัลสำหรับครูยุคใหม่',
    duration: 'สัปดาห์ที่ 1 • ใช้เวลาประมาณ 40 นาที',
    unescoCompetency: 'การบริหารจัดการเวลาในการใช้เทคโนโลยี การรับมือภาวะกดดันดิจิทัล และส่งเสริมสุขภาวะทางอารมณ์',
    mosherConcept: 'Mosher Level 3 (Solve): การแก้ไขและป้องกันปัญหาภาวะสมองล้า (Digital Burnout) ในชีวิตการทำงานครู',

    infographics: [
      {
        id: 'info-2-1',
        title: '5 สัญญาณเตือนภาวะ "Teacher Digital Burnout"',
        type: 'cards',
        summary: 'สังเกตอาการความเหนื่อยล้าทางอารมณ์จากการเชื่อมต่อเทคโนโลยีตลอด 24 ชม.',
        items: [
          { label: '1. Techno-Stress', detail: 'รู้สึกวิตกกังวลทุกครั้งที่มีเสียงแจ้งเตือนไลน์กลุ่มโรงเรียนนอกเวลางาน' },
          { label: '2. Emotional Fatigue', detail: 'หมดพลังในการเตรียมการสอน รู้สึกอารมณ์หงุดหงิดง่ายเมื่อต้องแก้ปัญหาไอที' },
          { label: '3. Digital Overload', detail: 'รับข้อมูลข่าวสารและไฟล์งานสอนมากเกินไปจนจัดลำดับความสำคัญไม่ได้' },
          { label: '4. Screen Insomnia', detail: 'นอนไม่หลับหรือหลับไม่สนิทจากการตรวจงานและเล่นจอมือถือก่อนนอน' },
          { label: '5. Boundary Blur', detail: 'เส้นแบ่งระหว่างชีวิตส่วนตัวกับการทำงานครูละลายหายไปโดยสิ้นเชิง' }
        ],
        badge: 'สุขภาวะครู',
        bgGradient: 'from-slate-900 to-emerald-950/40'
      },
      {
        id: 'info-2-2',
        title: 'เทคนิค "Digital Detox & Boundary Rules" สำหรับครู',
        type: 'slide',
        summary: 'ข้อตกลงเพื่อคืนความสุขและความสมดุลให้ชีวิต',
        items: [
          { label: 'กำหนดเวลาปิดรับข้อความงาน (After 19:00)', detail: 'สื่อสารกับผู้ปกครองอย่างสุภาพถึงช่วงเวลาตอบไลน์' },
          { label: 'เปิดใช้โหมด Focus / Do Not Disturb', detail: 'ในวันเสาร์-อาทิตย์ เพื่อพักผ่อนร่วมกับครอบครัว' },
          { label: 'สร้างพื้นที่ No-Tech Zone ในบ้าน', detail: 'ไม่นำมือถือหรือโน้ตบุ๊กเข้าไปในห้องนอน' }
        ],
        badge: 'การบริหารสมดุล',
        bgGradient: 'from-slate-900 to-teal-950/40'
      }
    ],

    video: {
      id: 'vid-m2',
      title: 'การสร้าง Work-Life-Tech Balance ของครูยุคดิจิทัล',
      durationStr: '01:50',
      durationSeconds: 110,
      posterUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      description: 'บทสัมภาษณ์ครูต้นแบบในการจัดสรรเวลาลดภาวะความเครียดจากแชตกลุ่ม และการส่งเสริมสุขภาพจิตในโรงเรียน',
      keyTimestamps: [
        { time: '00:20', label: 'ปัญหาการตอบแชตกลุ่มผู้ปกครอง 24 ชั่วโมง' },
        { time: '01:00', label: 'การตั้งกติกาコミュニケーションร่วมกัน' },
        { time: '01:35', label: 'ผลลัพธ์สุขภาพจิตครูที่พุ่งสูงขึ้น' }
      ]
    },

    resources: [
      {
        id: 'res-2-1',
        title: 'แบบประเมินความเครียดและภาวะ Burnout ของครู (Self-Assessment Test)',
        format: 'INTERACTIVE',
        size: 'Online Tool',
        linkText: 'เปิดแบบทดสอบ',
        url: '#'
      },
      {
        id: 'res-2-2',
        title: 'เทมเพลตป้ายประกาศข้อตกลงเวลาติดต่อสื่อสารระหว่างครูและผู้ปกครอง',
        format: 'CANVA LINK',
        size: 'Template',
        linkText: 'รับเทมเพลต',
        url: '#'
      }
    ],

    quiz: [
      {
        id: 'q2-1',
        question: 'ครูสมชายรู้สึกเครียด นอนไม่หลับ เพราะตอบไลน์กลุ่มผู้ปกครองถึง 23.00 น. ทุกคืน วิธีแก้ปัญหาที่เหมาะสมและยั่งยืนที่สุดคืออะไร?',
        options: [
          'ก) ลาออกจากครูทันที',
          'ข) สื่อสารข้อตกลงเวลาติดต่อสื่อสารที่ชัดเจนให้ผู้ปกครองทราบอย่างสุภาพ เช่น 08.00-17.00 น. หากฉุกเฉินให้โทรศัพท์แทน',
          'ค) ปิดโทรศัพท์หนีไปเลยตลอดทั้งสัปดาห์',
          'ง) ก่นด่าผู้ปกครองในโพสต์ส่วนตัว'
        ],
        correctAnswer: 1,
        explanation: 'การสร้างกติกาและขอบเขต (Boundary Setting) ที่ชัดเจนและสุภาพ ช่วยสร้างความเข้าใจที่ถูกต้องระหว่างครูและผู้ปกครอง พร้อมทั้งปกป้องสุขภาวะดิจิทัลของครู'
      }
    ]
  },

  'module-3': {
    id: 'module-3',
    title: 'Digital Creativity & Innovation',
    subtitle: 'การสร้างสรรค์สื่อนวัตกรรมการสอนดิจิทัล และการใช้ AI อย่างมีจริยธรรม',
    duration: 'สัปดาห์ที่ 2 • ใช้เวลาประมาณ 50 นาที',
    unescoCompetency: 'การออกแบบกิจกรรมการเรียนรู้บูรณาการเทคโนโลยี (TPACK) และการประยุกต์ใช้นวัตกรรมดิจิทัลอย่างชาญฉลาด',
    mosherConcept: 'Mosher Level 2 (Apply): ออกแบบคาบเรียนที่ใช้นวัตกรรมดิจิทัลกระตุ้นการคิดขั้นสูงของผู้เรียน',

    infographics: [
      {
        id: 'info-3-1',
        title: 'TPACK Framework: บูรณาการไอทีในการสอน',
        type: 'slide',
        summary: '3 หัวใจสำคัญในการสร้างนวัตกรรมการสอนที่ไม่ใช่แค่การเปิดสไลด์',
        items: [
          { label: 'TK (Technological Knowledge)', detail: 'ความรู้เรื่องเครื่องมือดิจิทัล เช่น Canva, Quizizz, GenAI, GeoGebra' },
          { label: 'PK (Pedagogical Knowledge)', detail: 'ความรู้ด้านวิธีสอนแบบ Active Learning, Gamification, Project-based' },
          { label: 'CK (Content Knowledge)', detail: 'ความรู้ลึกซึ้งในเนื้อหาวิชาที่ตนเองสอน' }
        ],
        badge: 'โมเดลนวัตกรรม',
        bgGradient: 'from-slate-900 to-purple-950/40'
      },
      {
        id: 'info-3-2',
        title: 'การใช้ Generative AI ในการจัดกิจกรรมการเรียนรู้',
        type: 'checklist',
        summary: 'หลักการใช้งาน AI สำหรับครูอย่างมีจริยธรรมและมีประสิทธิภาพ',
        items: [
          { label: 'ใช้ AI เป็นผู้ช่วยร่างแผนการสอน (Co-pilot)', ok: true, detail: 'ช่วยคิดไอเดียกิจกรรม แต่ครูต้องรีวิวและปรับให้เหมาะกับเด็ก' },
          { label: 'ตรวจสอบความถูกต้อง (Fact-Checking)', ok: true, detail: 'ป้องกันข้อมูลเท็จ (Hallucination) จาก AI' },
          { label: 'สอนให้นักเรียนใช้อ้างอิงอย่างโปร่งใส', ok: true, detail: 'ปลูกฝังความซื่อสัตย์ทางวิชาการและไม่คัดลอกผลงาน' }
        ],
        badge: 'GenAI ethics',
        bgGradient: 'from-slate-900 to-indigo-950/40'
      }
    ],

    video: {
      id: 'vid-m3',
      title: 'การออกแบบบทเรียน Active Learning ด้วยสื่อดิจิทัลและ AI',
      durationStr: '01:35',
      durationSeconds: 95,
      posterUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      description: 'สาธิตการใช้เครื่องมือดิจิทัลสร้างสื่อการเรียนรู้แบบโต้ตอบ เปลี่ยนห้องเรียนบรรยายแบบเดิมเป็นห้องเรียนนวัตกรรม',
      keyTimestamps: [
        { time: '00:15', label: 'การเปลี่ยนโจทย์ด้วย SAMR Model' },
        { time: '00:45', label: 'การใช้ AI ช่วยสร้างใบงานแบบเฉพาะบุคคล' },
        { time: '01:20', label: 'การประเมินผลตามสภาพจริงด้วย E-Portfolio' }
      ]
    },

    resources: [
      {
        id: 'res-3-1',
        title: 'คลัง Prompt คำสั่ง ChatGPT / Claude สำหรับครูสร้างแผนการสอน',
        format: 'NOTION LINK',
        size: 'Interactive Guide',
        linkText: 'เปิดคลัง Prompt',
        url: '#'
      },
      {
        id: 'res-3-2',
        title: 'คู่มือการเลือกสื่อดิจิทัลตามระดับ SAMR Model',
        format: 'PDF',
        size: '1.8 MB',
        linkText: 'ดาวน์โหลดคู่มือ',
        url: '#'
      }
    ],

    quiz: [
      {
        id: 'q3-1',
        question: 'ข้อใดเป็นการใช้ Generative AI ในการจัดการเรียนรู้ที่เหมาะสมที่สุดตามจริยธรรมดิจิทัล?',
        options: [
          'ก) ให้ AI เจนข้อสอบแล้วนำไปใช้ทันทีโดยไม่ตรวจสอบความถูกต้อง',
          'ข) ใช้ AI ช่วยร่างไอเดียกิจกรรมการเรียนรู้ แล้วครูนำมาปรับแก้ให้ตรงกับบริบทของนักเรียน พร้อมตรวจสอบความถูกต้อง',
          'ค) ให้นักเรียนสั่ง AI ทำรายงานส่งแล้วให้คะแนนเต็มทันที',
          'ง) สั่งห้ามนักเรียนใช้คอมพิวเตอร์และอินเทอร์เน็ตทุกชนิดในโรงเรียน'
        ],
        correctAnswer: 1,
        explanation: 'การใช้ AI เป็น Co-pilot ช่วยคิดสร้างสรรค์ โดยครูเป็นผู้กลั่นกรอง ตรวจสอบความถูกต้อง (Fact-checking) และปรับเข้ากับบริบท ถือเป็นการใช้นวัตกรรมดิจิทัลอย่างชาญฉลาดและรับผิดชอบ'
      }
    ]
  },

  'module-4': {
    id: 'module-4',
    title: 'Digital Participation & Agency',
    subtitle: 'อัตลักษณ์วิชาชีพครู การเป็นพลเมืองดิจิทัลต้นแบบ และการสร้างพลังขับเคลื่อนสังคม',
    duration: 'สัปดาห์ที่ 2 • ใช้เวลาประมาณ 45 นาที',
    unescoCompetency: 'การสร้างภาพลักษณ์วิชาชีพครูออนไลน์เชิงบวก การสื่อสารสาธารณะอย่างมีวิจารณญาณ และเป็นต้นแบบแก่ผู้เรียน',
    mosherConcept: 'Mosher Level 3 (Solve): การรับมือและแก้ไขปัญหากระแสวิพากษ์วิจารณ์ หรือ Cyberbullying บนโลกออนไลน์',

    infographics: [
      {
        id: 'info-4-1',
        title: 'การสร้าง "Positive Teacher Digital Footprint"',
        type: 'cards',
        summary: '4 แนวทางสร้างรอยเท้าดิจิทัลทรงคุณค่าทางวิชาชีพ',
        items: [
          { label: '1. Professional Brand', detail: 'แบ่งปันเทคนิคการสอน สื่อการเรียนรู้ และองค์ความรู้ที่เป็นประโยชน์แก่สังคมครู' },
          { label: '2. Respectful Discourse', detail: 'แสดงความคิดเห็นในประเด็นสังคมด้วยเหตุผล ไม่ใช้ถ้อยคำสร้างความเกลียดชัง (Hate Speech)' },
          { label: '3. Digital Advocacy', detail: 'เป็นกระบอกเสียงส่งเสริมความเท่าเทียมและการศึกษาที่ปลอดภัยทางออนไลน์' },
          { label: '4. Critical Consumption', detail: 'ตรวดสอบความถูกต้องก่อนกด Share ข่าวสาร เพื่อชะลอการแพร่กระจายข่าวปลอม (Fake News)' }
        ],
        badge: 'อัตลักษณ์ครูดิจิทัล',
        bgGradient: 'from-slate-900 to-cyan-950/40'
      }
    ],

    video: {
      id: 'vid-m4',
      title: 'การวางตัวและภาพลักษณ์ครูบนโลกโซเชียลมีเดีย',
      durationStr: '01:40',
      durationSeconds: 100,
      posterUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      description: 'เรื่องราวของครูรุ่นใหม่ที่ใช้โซเชียลมีเดียสร้างความเปลี่ยนแปลงเชิงบวก และสร้างแรงบันดาลใจให้ลูกศิษย์',
      keyTimestamps: [
        { time: '00:10', label: 'กรณีศึกษาข้อผิดพลาดบนโซเชียลมีเดีย' },
        { time: '00:45', label: 'การเปลี่ยนวิกฤตเป็นโอกาสสร้างเครือข่ายครู' },
        { time: '01:25', label: 'ข้อแนะนำการสร้างแบรนด์ครูเชิงบวก' }
      ]
    },

    resources: [
      {
        id: 'res-4-1',
        title: 'จรรยาบรรณวิชาชีพครูกับการใช้งานสื่อสังคมออนไลน์ (ฉบับคุรุสภาแนะนำ)',
        format: 'PDF',
        size: '1.2 MB',
        linkText: 'อ่านเอกสาร',
        url: '#'
      }
    ],

    quiz: [
      {
        id: 'q4-1',
        question: 'เมื่อครูพบข่าวสารดราม่าในโซเชียลมีเดียเกี่ยวกับพฤติกรรมของนักเรียนโรงเรียนอื่น ควรปฏิบัติตามหลัก Digital Citizenship อย่างไร?',
        options: [
          'ก) รีบแชร์ลงเฟซบุ๊กส่วนตัวเพื่อด่าทอนักเรียนทันที',
          'ข) ตรวจสอบที่มาของข่าว ชะลอการแชร์ และใช้วิจารณญาณ ไม่ร่วมผสมโรงบูลลี่เด็กบนออนไลน์',
          'ค) แท็กชื่อนักเรียนในห้องตนเองมาดูเป็นตัวอย่าง',
          'ง) คอมเมนต์ผสมโรงด้วยถ้อยคำรุนแรง'
        ],
        correctAnswer: 1,
        explanation: 'พลเมืองดิจิทัลต้นแบบต้องมี Critical Thinking ไม่ด่วนสรุป ชะลอการแชร์ข่าวสารที่ไม่ได้รับการยืนยัน และปฏิเสธการใช้วาทกรรมเกลียดชัง (Hate Speech) หรือการบูลลี่ออนไลน์'
      }
    ]
  }
};

// Post-Test Comprehensive Assessment Questions (Screen 6)
export const COMPETENCY_POST_TEST = [
  {
    id: 'pt-1',
    domain: 'Domain 1: Digital Safety & Privacy',
    question: 'ครูกานต์ต้องการนำภาพถ่ายกิจกรรมทดลองวิทยาศาสตร์ของนักเรียนชั้น ป.4 ไปลงในรายงานประจำปีของโรงเรียนและแฟนเพจ Facebook ควรดำเนินการตามหลัก PDPA อย่างไร?',
    options: [
      'ก) ไม่ต้องทำอะไรเลย เพราะเป็นกิจกรรมโรงเรียน',
      'ข) ตรวจสอบว่ามีใบยินยอม (Consent) จากผู้ปกครองหรือไม่ หากไม่มีควรถ่ายแบบมุมกว้างหลีกเลี่ยงการเห็นหน้าชัดเจน หรือเบลอใบหน้า',
      'ค) โพสต์รูปไปก่อน หากใครโวยวายค่อยลบทีหลัง',
      'ง) เบลอหน้านักเรียนทุกคนจนดูไม่รู้วิชาที่สอน'
    ],
    correctAnswer: 1,
    explanation: 'การตรวจสอบ Consent และการป้องกันการชี้ตัวเด็ก (Identification) ถือเป็นการปฏิบัติตามกฎหมาย PDPA และเคารพสิทธิความเป็นส่วนตัวของนักเรียน'
  },
  {
    id: 'pt-2',
    domain: 'Domain 2: Digital Emotional Well-being',
    question: 'คุณครูหลายท่านในโรงเรียนประสบภาวะ "Techno-Stress" รู้สึกวิตกกังวลจากการตอบไลน์กลุ่มตลอด 24 ชม. ข้อใดคือแนวทางระดับโรงเรียนที่ตรงตาม Mosher Level 3 (Solve Problem) มากที่สุด?',
    options: [
      'ก) ห้ามครูใช้โทรศัพท์มือถือเลย',
      'ข) ร่วมกันจัดทำ "ข้อตกลงและนโยบายการสื่อสารดิจิทัลของโรงเรียน" กำหนดช่วงเวลาติดต่อ และสร้างช่องทางฉุกเฉินเฉพาะ',
      'ค) ให้ครูไปฝึกสมาธิด้วยตนเองโดยโรงเรียนไม่ต้องปรับเปลี่ยน',
      'ง) เพิ่มไลน์กลุ่มอีก 3 กลุ่มเพื่อแยกเรื่องงาน'
    ],
    correctAnswer: 1,
    explanation: 'การร่วมกันสร้างนโยบายและแนวปฏิบัติขององค์กร (Policy & Guidelines) ช่วยแก้ปัญหาที่ต้นตอ สร้างวัฒนธรรมองค์กรที่เอื้อต่อสุขภาวะทางอารมณ์ของครู'
  },
  {
    id: 'pt-3',
    domain: 'Domain 3: Digital Pedagogy & Innovation',
    question: 'การประยุกต์ใช้ Generative AI ในการจัดกิจกรรมการเรียนรู้แบบ Active Learning ตามแนวทาง TPACK ควรเน้นสิ่งใดเป็นสำคัญ?',
    options: [
      'ก) เน้นให้ AI ทำหน้าที่สอนแทนครูทั้งหมด',
      'ข) ให้ AI เป็นเครื่องมือช่วยออกแบบกิจกรรม ร่างโจทย์ปัญหา แล้วให้เด็กได้คิดวิเคราะห์ ร่วมมือกัน และครูเป็น Facilitator',
      'ค) เน้นวัดผลความเร็วในการคัดลอกคำตอบจาก AI',
      'ง) ห้ามนักเรียนแตะต้อง AI ทุกรูปแบบ'
    ],
    correctAnswer: 1,
    explanation: 'AI เป็นสื่อนวัตกรรมเสริม (Augmentation/Modification) ที่ช่วยปลดล็อกเวลา ให้ครูมุ่งเน้นการจัดกิจกรรมกระตุ้นทักษะการคิดขั้นสูงของผู้เรียน'
  },
  {
    id: 'pt-4',
    domain: 'Domain 4: Professional Engagement',
    question: 'การเป็น "Digital Citizenship Role Model" ของครู สะท้อนผ่านพฤติกรรมใดบนโลกออนไลน์ชัดเจนที่สุด?',
    options: [
      'ก) การมีผู้ติดตาม (Followers) หลักแสนคนบน TikTok',
      'ข) การสื่อสารด้วยความเคารพ ตรวจสอบความถูกต้องของข้อมูลก่อนแชร์ เคารพสิทธิผู้อื่น และสร้างสรรค์ประโยชน์แก่สังคม',
      'ค) การโพสต์ระบายความรู้สึกต่อเพื่อนร่วมงานทุกวัน',
      'ง) การเงียบเฉยไม่รับรู้ข่าวสารดิจิทัลใดๆ'
    ],
    correctAnswer: 1,
    explanation: 'การเป็นต้นแบบพลเมืองดิจิทัลวัดจากคุณภาพของการมีส่วนร่วม ความรับผิดชอบ จริยธรรม และการสร้างรอยเท้าดิจิทัลเชิงบวก (Positive Digital Footprint)'
  },
  {
    id: 'pt-5',
    domain: 'UNESCO ICT Competency Integration',
    question: 'ความรู้เรื่อง Digital Citizenship ตามกรอบ UNESCO ส่งผลต่อความสำเร็จในการจัดการศึกษาศตวรรษที่ 21 ของครูอย่างไร?',
    options: [
      'ก) ช่วยให้ครูสอบผ่านการประเมินวิทยฐานะเท่านั้น',
      'ข) ช่วยให้ครูสามารถประยุกต์ใช้เทคโนโลยีอย่างปลอดภัย มีสุขภาวะดี สร้างสรรค์นวัตกรรม และนำผู้เรียนเป็นพลเมืองดิจิทัลที่มีคุณภาพ',
      'ค) เพิ่มภาระงานเอกสารให้ครูมากขึ้น 2 เท่า',
      'ง) ทำให้ครูไม่จำเป็นต้องมาสอนที่โรงเรียนอีกต่อไป'
    ],
    correctAnswer: 1,
    explanation: 'สมรรถนะดิจิทัลของครูตามกรอบ UNESCO ครอบคลุมทั้งความปลอดภัย สุขภาวะ นวัตกรรม และการขับเคลื่อนผู้เรียนสู่สังคมอนาคตอย่างสมบูรณ์'
  }
];
