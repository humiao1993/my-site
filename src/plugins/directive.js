import Vue from 'vue'

function scrollToFix(container, ele, params, remove) {
  function scrollM() {
    let _classes = ele.className.split(' ')
    if (container.scrollTop - params.offset > 0) {
      if (_classes.indexOf(params.fixClass) == -1) {
        _classes.push(params.fixClass)
        ele.className = _classes.join(' ')
      }
    } else {
      let _find = _classes.indexOf(params.fixClass);
      if (_find != -1) {
        _classes.splice(_find, 1)
        ele.className = _classes.join(' ')
      }
    }
  }

  if (remove) {
    container.removeEventListener('scroll', scrollM)
  } else {
    container.addEventListener('scroll', scrollM)
  }
}

Vue.directive('scroll-fix', {
  bind(el, bind) {
    if (bind.value && bind.value.target) {
      let checkEle = function () {
        let scrollContainer = document.getElementsByClassName(bind.value.target)
        if (scrollContainer && scrollContainer.length > 0) {
          scrollToFix(scrollContainer[0], el, bind.value)
        } else {
          setTimeout(checkEle, 300)
        }
      }
      setTimeout(checkEle, 300)
    }
  },
  unbind: function (el, bind) {
    if (bind.value && bind.value.target) {
      let scrollContainer = document.getElementsByClassName(bind.value.target)
      if (scrollContainer && scrollContainer.length > 0) {
        scrollToFix(scrollContainer[0], el, bind.value, true)
      }
    }
  }
})
