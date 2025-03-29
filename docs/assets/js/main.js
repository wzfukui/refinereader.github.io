document.addEventListener('DOMContentLoaded', async () => {
  // 获取当前语言
  const currentLang = document.documentElement.lang;
  
  // 加载对应语言的 i18n 文件
  const response = await fetch(`../i18n/${currentLang}.json`);
  const i18n = await response.json();
  
  // 更新安装指南内容
  const guideContent = document.querySelector('.guide-content');
  guideContent.innerHTML = `
    <div class="tab-content" id="online">
      <ol class="guide-steps">
        ${i18n.install.online.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>
    <div class="tab-content" id="offline">
      <ol class="guide-steps">
        ${i18n.install.offline.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>
  `;

  // 安装指南标签切换
  const tabs = document.querySelectorAll('.guide-tabs .tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      // 更新标签状态
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // 更新内容显示
      contents.forEach(content => {
        content.style.display = content.id === target ? 'block' : 'none';
      });
    });
  });

  // 初始化显示状态
  const activeTab = document.querySelector('.guide-tabs .tab.active');
  if (activeTab) {
    const target = activeTab.dataset.tab;
    contents.forEach(content => {
      content.style.display = content.id === target ? 'block' : 'none';
    });
  }
}); 