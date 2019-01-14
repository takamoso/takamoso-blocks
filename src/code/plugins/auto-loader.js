import dependencies from './../languages'

!function() {

if (typeof self === 'undefined' || !self.Prism || !self.document) {
	return
}

const addScript = src => {
  return () => {
    return new Promise((resolve, reject) => {
      const node = document.createElement('script')
      node.defer = true
      node.src = `${plugin_dir_url}prism-components/prism-${src}.min.js`
      node.onload = () => {
        document.body.removeChild(node)
        resolve()
      }
      node.onerror = () => {
        document.body.removeChild(node)
        reject()
      }
      document.body.appendChild(node)
    })
  }
}

Prism.hooks.add('complete', env => {
  if (!env.element || !env.language) {
    return
  }
  
  dependencies[env.language].map(language => {
    return addScript(language)
  }).reduce((prev, current) => {
    return prev.then(current)
  }, Promise.resolve()).then(() => {
    env.element.innerHTML = Prism.highlight(env.element.textContent, Prism.languages[env.language])
  })
})

}()