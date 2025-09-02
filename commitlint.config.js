const { defineConfig } = require('cz-git')
const fs = require('node:fs')
const path = require('node:path')

/* 获取项目的修改范围 */
const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name.replace(/s$/, ''))

module.exports = defineConfig({
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 自定义规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚 commit
        'chore' // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ]
    ],
    'subject-case': [0] // subject大小写不做校验
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      // footerPrefixesSelect: '选择关联issue前缀（可选）:',
      // customFooterPrefix: '输入自定义issue前缀 :',
      // footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      generatingByAI: '正在通过 AI 生成你的提交简短描述...',
      generatedSelectByAI: '选择一个 AI 生成的简短描述:',
      confirmCommit: '是否提交或修改commit ?'
    },
    // prettier-ignore
    types: [
      { value: "feat", name: "特性:     ✨  新增功能", emoji: ":sparkles:" },
      { value: "fix", name: "修复:     🐛  修复缺陷", emoji: ":bug:" },
      { value: "docs", name: "文档:     📝  文档变更", emoji: ":memo:" },
      { value: "style", name: "格式:     💄  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:" },
      { value: "refactor", name: "重构:     ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:" },
      { value: "perf", name: "性能:     🚀  性能优化", emoji: ":zap:" },
      { value: "test", name: "测试:     🧪  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:" },
      { value: "build", name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）", emoji: ":package:" },
      { value: "ci", name: "集成:     ⚙️  修改 CI 配置、脚本", emoji: ":ferris_wheel:" },
      { value: "revert", name: "回退:     ↩️  回滚 commit", emoji: ":rewind:" },
      { value: "chore", name: "其他:     🛠️  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:" },
    ],
    useEmoji: true, // 是否使用 emoji 图标
    emojiAlign: 'center', // emoji 图标位置
    useAI: false, // 是否使用 AI 生成提交描述
    aiNumber: 1, // AI 生成提交描述数量
    themeColorCode: '38;5;168', // 主题颜色代码
    scopes: [...scopes], // 选择的提交范围
    allowCustomScopes: true, // 是否允许自定义提交范围
    allowEmptyScopes: true, // 是否允许空提交范围
    customScopesAlign: 'bottom', // 自定义提交范围位置
    customScopesAlias: 'custom', // 自定义提交范围别名
    emptyScopesAlias: 'empty', // 空提交范围别名
    upperCaseSubject: false, // 选择是否将提交描述转换为大写
    markBreakingChangeMode: false, // 是否标记破坏性变更
    allowBreakingChanges: ['feat', 'fix'], // 允许的破坏性变更类型
    breaklineNumber: 100, // 换行字符数量
    breaklineChar: '|', // 换行字符
    skipQuestions: ['footer'], // 跳过的问题
    //issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],    // 选择的问题前缀
    //customIssuePrefixAlign: 'top',          // 自定义问题前缀位置
    emptyIssuePrefixAlias: 'skip', // 空问题前缀别名
    //customIssuePrefixAlias: 'custom',       // 自定义问题前缀别名
    //allowCustomIssuePrefix: true,           // 是否允许自定义问题前缀
    //allowEmptyIssuePrefix: true,            // 是否允许空问题前缀
    confirmColorize: true, // 是否确认颜色化
    maxHeaderLength: Infinity, // 最大提交描述长度
    maxSubjectLength: Infinity, // 最大提交描述长度
    minSubjectLength: 0,
    scopeOverrides: undefined, // 选择的提交范围覆盖
    defaultBody: '', // 默认提交描述
    //defaultIssues: '',                      // 默认问题
    defaultScope: '', // 默认提交范围
    defaultSubject: '' // 默认提交描述
  }
})
