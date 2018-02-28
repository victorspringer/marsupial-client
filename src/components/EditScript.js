import React, { Component } from 'react';
import AceEditor from 'react-ace';
import CodeDiff from './CodeDiff';
import { Button, Icon, Row, Col, Input } from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';
import { getScriptVersion, saveScript } from '../actions/ScriptsActions';
import md5 from 'js-md5';
import '../assets/EditScript.css';
import 'brace';
import 'brace/ext/language_tools';

const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
];

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
];

languages.forEach((lang) => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
})

themes.forEach((theme) => {
  require(`brace/theme/${theme}`);
})

class EditScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: 'edit',
      code: '',
      mode: 'javascript',
      theme: 'textmate',
      filepath: '',
      region: ''
    };
  }

  componentDidMount() {
    const { id, version, dispatch } = this.props;
    if (id && version) {
      dispatch(getScriptVersion(id, version));
    } else {
      this.setState({ pageType: 'add' });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.scriptsData && nextProps.scriptsData.savedScript) {
      const { error } = nextProps.scriptsData.savedScript;
      if (error && error !== '') {
        toast.error(nextProps.scriptsData.savedScript.error, {
          position: toast.POSITION.TOP_CENTER
        });
        delete nextProps.scriptsData.savedScript.error;
        return;
      }

      const { scriptsData } = this.props;
      const nextSavedScript = nextProps.scriptsData.savedScript;
      if (!scriptsData.savedScript || scriptsData.savedScript !== nextSavedScript) {
        const { version } = nextProps.scriptsData.savedScript;
        if (this.state.pageType === 'edit') {
          window.location = `./${version}`;
        } else {
          window.location = `../script-version/${nextSavedScript.id}/${version}`;          
        }
      }
    }

    if (nextProps.scriptsData && nextProps.scriptsData.script) {
      const nextCode = nextProps.scriptsData.script.code;
      const nextMode = nextProps.scriptsData.script.language;
      const { code, mode } = this.state;
      const { scriptsData } = this.props;
      const prevCode = scriptsData && scriptsData.script ? scriptsData.script.code : code;
      const prevMode = scriptsData && scriptsData.script ? scriptsData.script.language : mode;
      
      if ((nextCode !== code && nextCode !== prevCode) || (nextMode !== mode && nextMode !== prevMode)) {
        this.setState({
          code: nextCode,
          mode: nextMode
        });

        const select = document.evaluate(
          `//li/span[text()='${nextMode}']`,
          document,
          null,
          XPathResult.ANY_TYPE,
          null
        );
        const option = select.iterateNext();
        if (option) option.click();
      }
    }
  }
  
  updateCode(code) {
    if (this.state.code !== code) {
      this.setState({ code });
    }
  }

  setMode(e) {
    this.setState({ mode: e.target.value });
  }
  
  setTheme(e) {
    this.setState({ theme: e.target.value });
  }

  changeFilepath(e) {
    this.setState({ filepath: e.target.value });
  }

  changeRegion(e) {
    this.setState({ region: e.target.value });
  }

  save(props) {
    const { scriptsData, version, dispatch } = props;
    let { script } = scriptsData;

    if (script) {
      script.code = this.state.code;
      script.user = localStorage.getItem('username');
      script.language = this.state.mode;
      script.created_at = new Date().toLocaleString();
    } else {
      const { filepath, region } = this.state;
      if (filepath.replace(/\s/g,'') === '') {
        toast.error('S3 file path is required!', {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      if (region.replace(/\s/g,'') === '') {
        toast.error('S3 region is required!', {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      script = {
        id: this.generateId(filepath),
        path: filepath,
        code: this.state.code,
        user: localStorage.getItem('username'),
        language: this.state.mode,
        created_at: new Date().toLocaleString(),
        version,
        region,
        aws_key: localStorage.getItem('awsKey'),
        aws_secret: localStorage.getItem('awsSecret'),
      }
    }

    dispatch(saveScript(script));
  }

  generateId(path) {
    const timestamp = new Date().getTime().toString();
    return md5(path + timestamp);
  }

  render() {
    const { script } = this.props.scriptsData;
    const { pageType } = this.state;
    
    return (
      <div className='app-body-card'>
        <ToastContainer />
        <Row className='page-header'>
            <Col s={ 6 }>
              { pageType === 'edit' && <h1>{ script && script.path }</h1> }
              { pageType === 'add' && <h1>Add script</h1> }
            </Col>
            <Col s={ 6 }>
              <Button className='right' waves='light' onClick={ () => this.save(this.props) }>
                Release<Icon left>save</Icon>
              </Button>
            </Col>
        </Row>
        {
          pageType === 'add' &&
            <Row>
              <Input 
                s={ 6 }
                label='S3 file path'
                placeholder='e.g. bucket_name/dir/script.js'
                value={ this.state.filepath }
                onChange={ this.changeFilepath.bind(this) }
              />
              <Input 
                s={ 6 }
                label='S3 region'
                placeholder='e.g. us-east-1'
                value={ this.state.region }
                onChange={ this.changeRegion.bind(this) }
              />
            </Row>
        }
        <Row className='editor-options'>
          <Col s={ 12 } m={ pageType === 'edit' ? 6 : 12 }>
            <Input
              s={ 6 }
              type='select'
              label='Language'
              onChange={ this.setMode.bind(this) }
              defaultValue={ this.state.mode }
            >
              { languages.map((lang) => <option key={ lang } value={ lang }>{ lang }</option>) }
            </Input>
            <Input
              s={ 6 }
              type='select'
              label='Theme'
              onChange={ this.setTheme.bind(this) }
              defaultValue={ this.state.theme }
            >
              { themes.map((theme) => <option key={ theme } value={ theme }>{ theme }</option>) }
            </Input>
          </Col>
          {
            pageType === 'edit' &&
            <Col className='code-diff-title' s={ 12 } m={ 6 }>
              <h2>Code difference</h2>
            </Col>   
          }
        </Row>
        <Row>
          <Col s={ 12 } m={ pageType === 'edit' ? 6 : 12 }>
            <AceEditor
              mode={ this.state.mode }
              theme={ this.state.theme }
              onChange={ this.updateCode.bind(this) }
              fontSize={ 14 }
              showPrintMargin={ false }
              showGutter={ true }
              highlightActiveLine={ true }
              value={ this.state.code }
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2
              }}
              editorProps={ { $blockScrolling: Infinity } }
            />
          </Col>
          {
            pageType === 'edit' &&
            <Col s={ 12 } m={ 6 }>
              { script && <CodeDiff baseText={ script.code } newText={ this.state.code } /> }
            </Col>
          }
        </Row>
      </div>
    );
  }
}

export default EditScript;