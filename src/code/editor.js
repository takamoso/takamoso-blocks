import 'prismjs'
import './plugins/auto-loader'
import prism_components from 'prismjs/components'
import prism_dependencies from './languages'

const {registerBlockType} = wp.blocks
const {Component, Fragment} = wp.element
const {InspectorControls} = wp.editor
const {PanelBody, SelectControl} = wp.components

registerBlockType('takamoso/code', {
  title: 'Code',
  category: 'takamoso-blocks',
  supports: {
    className: false
  },
  attributes: {
    content: {
      type: 'string',
      source: 'text',
      selector: 'code',
      default: ''
    },
    language: {
      type: 'string',
      default: 'markup'
    }
  },
  edit: class extends Component {
    constructor() {
      super(...arguments)
    }
    render() {
      const {attributes: {content, language}, setAttributes} = this.props
      
      return (
        <Fragment>
          <InspectorControls>
            <PanelBody title="Languages">
              <SelectControl
                value={language}
                options={
                  Object.keys(prism_dependencies).map(language => {
                    return {label: prism_components.languages[language].title, value: language}
                  })
                }
                onChange={language => {
                  setAttributes({language})
                  Prism.hooks.run('complete', {language, element: this.code})
                }}
              />
            </PanelBody>
          </InspectorControls>
          <div class="takamoso-blocks--code">
            <pre
              class={`language-${language}`}
              ref={node => this.pre = node}>
              <code
                ref={node => this.code = node}
                dangerouslySetInnerHTML={{__html: (Prism.languages[language] ? Prism.highlight(content, Prism.languages[language]) : content) + (content.slice(-1) === '\u000a' ? '&#8203;' : '')}}
              />
            </pre>
            <textarea
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              defaultValue={content}
              onChange={event => setAttributes({content: event.target.value})}
              onScroll={event => this.pre.scrollLeft = event.target.scrollLeft}
            />
          </div>
        </Fragment>
      )
    }
  },
  save({attributes: {content, language}}) {
    return (
      <pre class={`language-${language}`}>
        <code>{content}</code>
      </pre>
    )
  }
})