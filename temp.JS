const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.getAttribute('href').substring(1);
    sections.forEach(section => {
      if (section.id === target) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
    // 更新页面标题
    switch (target) {
      case 'home':
        document.title = '首页 - Empower Ability Labs';
        break;
      case 'services':
        document.title = '服务 - Empower Ability Labs';
        break;
      case 'schedule':
        document.title = '预约电话 - Empower Ability Labs';
        break;
      default:
        document.title = 'Empower Ability Labs';
    }
    // 设置焦点到部分中的第一个可聚焦元素
    const firstFocusable = document.getElementById(target).querySelector('h1, h2, p, input, button');
    if (firstFocusable) {
      firstFocusable.focus();
    }
    // 历史管理
    history.pushState({ section: target }, '', `#${target}`);
  });
});

// Modal Handling
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

openModalBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Schedule Form Handling
const scheduleForm = document.getElementById('scheduleForm');
const eventDetails = document.getElementById('eventDetails');
const speakerCheckBox = document.getElementById('speaker');

// 处理活动详情显示
speakerCheckBox.addEventListener('change', () => {
  if (speakerCheckBox.checked) {
    eventDetails.style.display = 'block';
  } else {
    eventDetails.style.display = 'none';
  }
});

// Form submission and validation
scheduleForm.addEventListener('submit', e => {
  e.preventDefault();
  const businessName = document.getElementById('businessName');
  const phoneNumber = document.getElementById('phoneNumber');
  const email = document.getElementById('email');
  const topics = document.getElementsByName('topics[]');
  let hasTopicSelected = false;

  // 验证必填字段
  if (!businessName.value) {
    alert('公司名称是必填项');
    businessName.focus();
    return;
  }
  if (!phoneNumber.value || !phoneNumber.value.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/)) {
    alert('电话号码是必填项，必须为 123-456-7890 格式');
    phoneNumber.focus();
    return;
  }
  if (!email.value) {
    alert('邮箱是必填项');
    email.focus();
    return;
  }
  // 检查至少选择一个话题
  for (const topic of topics) {
    if (topic.checked) {
      hasTopicSelected = true;
      break;
    }
  }
  if (!hasTopicSelected) {
    alert('请至少选择一个话题');
    return;
  }
  // 若选择演讲者，检查活动详情
  if (speakerCheckBox.checked && !document.getElementById('eventDescription').value) {
    alert('请告诉我们您的活动详情');
    document.getElementById('eventDescription').focus();
    return;
  }
  // 验证通过，显示感谢信息
  alert('感谢！我们将尽快与您联系，安排电话。');
});

// Handle browser back/forward navigation
window.addEventListener('popstate', e => {
  const state = e.state;
  if (state && state.section) {
    const target = state.section;
    sections.forEach(section => {
      if (section.id === target) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
    // 更新页面标题
    switch (target) {
      case 'home':
        document.title = '首页 - Empower Ability Labs';
        break;
      case 'services':
        document.title = '服务 - Empower Ability Labs';
        break;
      case 'schedule':
        document.title = '预约电话 - Empower Ability Labs';
        break;
      default:
        document.title = 'Empower Ability Labs';
    }
    // 设置焦点
    const firstFocusable = document.getElementById(target).querySelector('h1, h2, p, input, button');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
});