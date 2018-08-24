module.exports = api => {
	// 一个特性对象应该是一个有效的 inquirer 选择对象
  api.injectFeature({
    name: 'Some great feature',
    value: 'my-feature'
  })

  // injectPrompt 期望接收一个有效的 inquirer 对话对象
  api.injectPrompt({
    name: 'someFlag',
    // 确认对话只在用户已经选取了特性的时候展示
    when: answers => answers.features.include('my-feature'),
    message: 'Do you want to turn on flag foo?',
    type: 'confirm'
  })

  // 当所有的对话都完成之后，将你的插件注入到
  // 即将传递给 Generator 的 options 中
  api.onPromptComplete((answers, options) => {
    if (answers.features.includes('my-feature')) {
      options.plugins['vue-cli-plugin-my-feature'] = {
        someFlag: answers.someFlag
      }
    }
  })
}