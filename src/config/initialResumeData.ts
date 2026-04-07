import { DEFAULT_FIELD_ORDER } from "./constants";
import { DEFAULT_CONFIG, GlobalSettings } from "../types/resume";

const initialGlobalSettings: GlobalSettings = {
  baseFontSize: 16,
  pagePadding: 32,
  paragraphSpacing: 12,
  lineHeight: 1.5,
  sectionSpacing: 10,
  headerSize: 18,
  subheaderSize: 16,
  useIconMode: true,
  themeColor: "#000000",
  centerSubtitle: true
};

export const initialResumeState = {
  title: "新建简历",
  basic: {
    name: "林然",
    title: "全栈工程师",
    employementStatus: "开放机会",
    email: "linran@example.com",
    phone: "13912345678",
    location: "上海，中国",
    birthDate: "1996-08",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin"
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "portfolio",
        label: "个人网站",
        value: "https://linran.dev",
        icon: "Globe"
      }
    ],
    photo: "/avatar.png"
  },
  education: [
    {
      id: "1",
      school: "同济大学",
      major: "软件工程",
      degree: "",
      startDate: "2014-09",
      endDate: "2018-06",
      visible: true,
      gpa: "",
      description: `<ul>
        <li>主修课程包括软件工程、分布式系统、数据库系统与人机交互设计。</li>
        <li>完成校企联合毕业设计，负责需求梳理、前端实现与可用性验证。</li>
        <li>组织学生技术分享活动，帮助低年级同学建立项目协作与代码规范意识。</li>
      </ul>`
    }
  ],
  skillContent: `<div class="skill-content">
  <ul>
    <li>熟悉 TypeScript、JavaScript、HTML5、CSS3，以及 React、Vue 等现代前端框架。</li>
    <li>具备 Node.js 服务开发经验，能够设计接口、处理数据流并完成基本部署。</li>
    <li>擅长搭建设计系统、组件库和中后台工作台，关注可维护性与交互一致性。</li>
    <li>熟悉 Vitest、Playwright、Testing Library 等测试工具，重视回归验证。</li>
    <li>能够与产品、设计、运营协作推进需求落地，并用数据衡量改进效果。</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "北辰数字",
      position: "全栈工程师",
      date: "2021.03 - 2025.02",
      visible: true,
      details: `<ul>
        <li>负责客户运营工作台的前后端迭代，覆盖线索流转、客户画像和任务协同等核心场景。</li>
        <li>主导组件规范与页面模板整理，将新页面交付时间从 5 天缩短到 2 天。</li>
        <li>优化首屏加载和接口聚合策略，使高频页面平均加载耗时下降 38%。</li>
        <li>与设计、运营共同梳理关键路径，持续提升表单完成率和任务处理效率。</li>
      </ul>`
    }
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "客户运营工作台",
      role: "项目负责人",
      date: "2023.02 - 2024.11",
      description: `<ul>
        <li>搭建面向销售与运营团队的工作台，统一管理线索分配、跟进计划与阶段复盘。</li>
        <li>设计模块化页面结构和权限体系，支撑多个角色在同一套系统中高效协作。</li>
        <li>通过仪表盘与提醒机制提升关键信息可见性，降低人工遗漏风险。</li>
      </ul>`,
      visible: true
    },
    {
      id: "p2",
      name: "内容发布协作平台",
      role: "前端主程",
      date: "2022.01 - 2022.12",
      description: `<ul>
        <li>为市场与编辑团队搭建多端内容发布平台，统一稿件提交流程与审核状态展示。</li>
        <li>引入可复用表单与富文本编辑能力，减少重复开发并提升内容质量稳定性。</li>
        <li>完善发布前检查流程，帮助团队在上线前更早发现格式和链接问题。</li>
      </ul>`,
      visible: true
    },
    {
      id: "p3",
      name: "面试流程协作系统",
      role: "全栈开发",
      date: "2020.06 - 2021.01",
      description: `<ul>
        <li>为招聘团队实现候选人流程追踪、面试记录沉淀和跨角色协作提醒。</li>
        <li>负责前端交互、数据模型与通知逻辑，保障面试流程信息同步清晰可追溯。</li>
        <li>支持导出结构化候选人总结，帮助团队更快完成复盘与后续沟通。</li>
      </ul>`,
      visible: true
    }
  ],
  menuSections: [
    { id: "basic", title: "基本信息", icon: "👁", enabled: true, order: 0 },
    { id: "skills", title: "专业技能", icon: "⚿", enabled: true, order: 1 },
    {
      id: "experience",
      title: "工作经验",
      icon: "💈",
      enabled: true,
      order: 2
    },
    {
      id: "projects",
      title: "项目经历",
      icon: "🎌",
      enabled: true,
      order: 3
    },
    {
      id: "education",
      title: "教育经历",
      icon: "📗",
      enabled: true,
      order: 4
    }
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings
};

export const initialResumeStateEn = {
  title: "New Resume",
  basic: {
    name: "Alex Chen",
    title: "Full-Stack Engineer",
    employementStatus: "Open to work",
    email: "alex.chen@example.com",
    phone: "(555) 240-7788",
    location: "Shanghai, CN",
    birthDate: "",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin"
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "portfolio",
        label: "Portfolio",
        value: "https://alexchen.dev",
        icon: "Globe"
      }
    ],
    photo: "/avatar.png"
  },
  education: [
    {
      id: "1",
      school: "Tongji University",
      major: "Software Engineering",
      degree: "",
      startDate: "2014-09",
      endDate: "2018-06",
      visible: true,
      gpa: "",
      description: `<ul>
        <li>Focused on software engineering, distributed systems, database design, and interaction design.</li>
        <li>Completed a capstone project with an industry partner, covering discovery, interface design, and usability validation.</li>
        <li>Organized peer learning sessions that helped junior students build stronger collaboration and code review habits.</li>
      </ul>`
    }
  ],
  skillContent: `<div class="skill-content">
  <ul>
    <li>Strong in TypeScript, JavaScript, HTML5, CSS3, and modern frontend frameworks including React and Vue.</li>
    <li>Comfortable building Node.js services, shaping APIs, and supporting end-to-end product delivery.</li>
    <li>Experienced in design systems, shared component libraries, and dashboard-style product interfaces.</li>
    <li>Uses Vitest, Playwright, and Testing Library to keep product changes verifiable and regression-safe.</li>
    <li>Works closely with product, design, and operations partners to translate ambiguity into shippable flows.</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "Northline Studio",
      position: "Full-Stack Engineer",
      date: "2021.03 - 2025.02",
      visible: true,
      details: `<ul>
        <li>Built and maintained a client operations workspace covering lead routing, account views, and cross-team task tracking.</li>
        <li>Created reusable page patterns and shared UI primitives that reduced new screen delivery time from five days to two.</li>
        <li>Improved loading performance and API aggregation, lowering average load time on high-traffic screens by 38%.</li>
        <li>Partnered with design and operations teams to refine critical workflows and raise completion rates on complex forms.</li>
      </ul>`
    }
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "Client Operations Workspace",
      role: "Project Lead",
      date: "2023.02 - 2024.11",
      description: `<ul>
        <li>Built a unified workspace for sales and operations teams to manage lead assignment, follow-up planning, and deal reviews.</li>
        <li>Designed modular page architecture and role-aware permissions so multiple teams could operate from one shared system.</li>
        <li>Added dashboards and reminders that made critical next steps easier to spot and reduced manual misses.</li>
      </ul>`,
      visible: true
    },
    {
      id: "p2",
      name: "Content Review Console",
      role: "Frontend Lead",
      date: "2022.01 - 2022.12",
      description: `<ul>
        <li>Created a multi-channel publishing console for editorial and marketing teams with shared review and release states.</li>
        <li>Introduced reusable forms and rich text tooling to reduce repeat implementation work and improve content consistency.</li>
        <li>Added preflight checks that surfaced formatting and link issues earlier in the publishing process.</li>
      </ul>`,
      visible: true
    },
    {
      id: "p3",
      name: "Interview Coordination Portal",
      role: "Full-Stack Developer",
      date: "2020.06 - 2021.01",
      description: `<ul>
        <li>Built a hiring workflow portal for recruiter coordination, interviewer notes, and candidate progress tracking.</li>
        <li>Owned interface behavior, core data models, and notification flows so updates stayed visible across roles.</li>
        <li>Supported structured exports for candidate summaries, making handoff and debrief cycles faster.</li>
      </ul>`,
      visible: true
    }
  ],
  menuSections: [
    {
      id: "basic",
      title: "Profile",
      icon: "👁",
      enabled: true,
      order: 0
    },
    {
      id: "skills",
      title: "Skills",
      icon: "⚿",
      enabled: true,
      order: 1
    },
    {
      id: "experience",
      title: "Experience",
      icon: "💈",
      enabled: true,
      order: 2
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🎌",
      enabled: true,
      order: 3
    },
    {
      id: "education",
      title: "Education",
      icon: "📗",
      enabled: true,
      order: 4
    }
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings
};

export const blankResumeState = {
  ...initialResumeState,
  title: "新建简历",
  basic: {
    ...initialResumeState.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: []
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeState.menuSections[0]]
};

export const blankResumeStateEn = {
  ...initialResumeStateEn,
  title: "New Resume",
  basic: {
    ...initialResumeStateEn.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: []
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeStateEn.menuSections[0]]
};
