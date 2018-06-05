import React from 'react';
import {
  Text, View, Modal, KeyboardAvoidingView, 
  Image, TextInput, ScrollView, BackHandler, 
  TouchableOpacity, AsyncStorage, 
  StatusBar, Switch, ActivityIndicator
} from 'react-native';
import theme, { styles } from 'react-native-theme';
// Font and Icons
import { Fonts } from './src/Fonts';
import FontAwesome, { Icons } from 'react-native-fontawesome';

// Added Themes Files
theme.add(require('./theme/default'));
theme.add(require('./theme/light'), 'light');

/*************************************************/
/*************************************************/

// This is bad practice as you should split every class of these into a separate component

class Splash extends React.Component {
  render() {
      return (
          <View style={styles.splashWrapper} >
            <View style={styles.splashContent} >
              <Text style={styles.splashText} >SimpllisT</Text>
              <ActivityIndicator size={25} color="#e09f7d" />
            </View>
            <View style={styles.splashFooter} >
              <Text style={styles.footerText} >Powered by &copy; MU</Text>
            </View>
          </View>
      );
  }
}
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    // Binding Functions
    this.handleAllChecked = this.handleAllChecked.bind(this);

    this.state = {
      settingOn: false,
      checkAll: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ settingOn: nextProps.switchNav })
  }
  handleAllChecked() {
    this.state.checkAll ? this.props.showAll() : this.props.hideChecked()
    this.setState({ checkAll: !this.state.checkAll });
  }
  render() {
      const slideStyle = this.state.slide;
      return (
          <View style={styles.navbar} >
              { this.state.settingOn ?
                <View style={styles.settingWrapper} >
                  <View style={styles.switchWrapper} >
                    <Text style={[styles.switchText, {minWidth: 90}]} >{!this.state.checkAll ? 'Hide' : 'Show'} checked : </Text>
                    <Switch
                      tintColor='#ccc'
                      onTintColor='#C9ADA7'
                      thumbTintColor='#e09f7d'
                      onValueChange={this.handleAllChecked}
                      value={this.state.checkAll}
                      style={styles.switchBtn} 
                    />
                  </View>
                  <View style={[styles.switchWrapper, {marginLeft: 20}]} >
                    <Text style={styles.switchText} >Dark</Text>
                    <Switch
                      tintColor='#ccc'
                      onTintColor='#C9ADA7'
                      thumbTintColor='#e09f7d'
                      onValueChange={this.props.handleTheme()}
                      value={(theme.name === 'default') ? false : true}
                      style={styles.switchBtn} 
                    />
                    <Text style={styles.switchText} >Light</Text>
                  </View>
                </View>
              :
                <Text style={styles.navbarHeading} >SimpllisT</Text>
              }
              <TouchableOpacity onPress={this.props.handleForm()} style={styles.settingBtn} >
                <FontAwesome style={styles.navbarSettings} >{Icons.cog}</FontAwesome>
              </TouchableOpacity>
          </View>
      );
  }
}
class Form extends React.Component {
  constructor(props) {
    super(props);
    // Binding Functions
    this.handleChange = this.handleChange.bind(this);
    this.addNewNote = this.addNewNote.bind(this);

    this.state = {
      newNote: '',
      settingOn: false,
      hideActive: true
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      settingOn: nextProps.switchForm,
      hideActive: !nextProps.inactiveForm
    })
  }

  handleChange(e) { this.setState({ newNote: e }) }

  addNewNote() {
    this.refs.taskInput.blur()
    const newNote = this.state.newNote;
    const trimmedNote = newNote.trim();
    if (trimmedNote !== '') {
      this.props.addNote(trimmedNote);
      this.setState({newNote: ''})
    }
  }

  render() {
      return (
          <View style={styles.formWrapper} >
            { this.state.settingOn ?
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.formBack} onPress={this.props.handleForm()} >
                  <FontAwesome style={[styles.modalBtnsText, {fontSize: 16}]} >{Icons.chevronLeft}</FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleModal()} activeOpacity={0.6} style={[styles.formSettingBtn, {marginRight: 15}]} >
                  <Text style={styles.btnText} >Set Password</Text>
                  <FontAwesome style={styles.moreBtn} >{Icons.lock}</FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={[styles.formSettingBtn, {flex: 1, justifyContent: 'center', marginRight: 10}]} >
                  <Text style={styles.btnText} >Don't forget to RATE</Text>
                  <FontAwesome style={styles.moreBtn} >{Icons.star}</FontAwesome>
                </TouchableOpacity>
              </View>
            :
              <View style={styles.form}>
                <TextInput
                  ref='taskInput'
                  editable={this.state.hideActive ? true : false}
                  multiline={true} 
                  maxHeight={80} 
                  selectionColor={theme.name === 'default' ? '#fff' : '#e09f7d'}
                  underlineColorAndroid='transparent' 
                  placeholderTextColor='#e09f7d' 
                  placeholder={this.state.hideActive ? 'Add new task' : 'Show checked tasks before adding new ones'}
                  value={this.state.newNote} 
                  onChangeText={this.handleChange} 
                  style={styles.formInput} 
                />
                <TouchableOpacity onPress={this.addNewNote} activeOpacity={0.6} style={styles.formButton} >
                  <FontAwesome style={styles.addBtn} >{Icons.locationArrow}</FontAwesome>
                </TouchableOpacity>
              </View>
            }
          </View>
      );
  }
}
class Note extends React.Component {
  constructor(props) {
    super(props);
    // Note Properties
    this.noteText = props.noteText;
    this.noteDate = props.noteDate;
    this.noteId = props.noteId;
    this.noteStatus = props.noteStatus;

    // Binding Functions
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);

    this.state = {
      updatedText: '',
      isChecked: this.noteStatus,
      needConfirm: true,
      editMode: false,
      noControls: true
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      noControls: !nextProps.allNotesStatus
    })
  }
  handleConfirm() {
    this.setState({
      needConfirm: !this.state.needConfirm
    })
  }
  handleCheck(id) {
    this.props.updateStatus(id);
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  handleRemoving(id) {
    this.props.removeNote(id);
  }
  editMode() {
    this.setState({
      editMode: !this.state.editMode,
      updatedText: this.noteText
    })
  }
  handleUpdateText(e) {
    this.setState({
      updatedText: e
    })
  }
  confirmSubmit(id, updatedText) {
    let trimmedText = updatedText.trim();
    this.props.handleSubmit(id, trimmedText);
    this.noteText = trimmedText;
    this.noteDate = this.props.updateDate;
    this.setState({
      editMode: !this.state.editMode
    })
  }
  render() {
      return (
        <View>
          <View style={[styles.noteWrapper,  this.state.isChecked ? styles.noteChecked : null]} >
            <View style={styles.noteBorder} >
              { this.state.editMode ? 
                <TextInput
                  autoFocus={true}
                  multiline={true}
                  selectionColor='#555' 
                  underlineColorAndroid='transparent' 
                  placeholderTextColor='#000'
                  value={this.state.updatedText}
                  onChangeText={this.handleUpdateText}
                  style={styles.noteInput} 
                />
              :
                <Text style={[styles.noteText,  this.state.isChecked ? styles.noteTextChecked : null]} >{this.noteText}</Text>
              }
            </View>
          </View>
          
          {this.state.needConfirm ?
            <View style={styles.controls} >
              <Text style={styles.date} >{this.noteDate}</Text>
              {this.state.noControls ? 
                <View style={styles.buttonsWrap} >
                  {!this.state.isChecked ?
                    <TouchableOpacity onPress={ () => this.editMode() } style={styles.delete} >
                      <FontAwesome style={styles.controlBtns} >{ this.state.editMode ? Icons.thumbsDown : Icons.pencil }</FontAwesome>
                    </TouchableOpacity>
                  :
                    null
                  }
                  <TouchableOpacity onPress={ this.state.editMode ? () => this.confirmSubmit(this.noteId, this.state.updatedText) : () => this.handleCheck(this.noteId) } style={[styles.check, this.state.isChecked ? styles.checked : null]} >
                    <FontAwesome style={[styles.controlBtns,  this.state.isChecked ? styles.checkedBtn : null]} >{ this.state.editMode ? Icons.thumbsUp : Icons.check }</FontAwesome>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={ () => this.handleConfirm() }  style={styles.delete} >
                    <FontAwesome style={styles.controlBtns} >{Icons.trash}</FontAwesome>
                  </TouchableOpacity>
                </View>
              :
                null
              }
            </View>
          :
            <View style={styles.controls} >
              <Text style={styles.date} >Are you sure ?</Text>
              <View style={styles.buttonsWrap} >
                <TouchableOpacity onPress={ () => this.handleRemoving(this.noteId) } style={styles.check} >
                  <Text style={[styles.controlBtns, {fontFamily: Fonts.NunitoB}]} >Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.handleConfirm() } style={styles.delete} >
                  <Text style={[styles.controlBtns, {fontFamily: Fonts.NunitoB}]} >No</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      );
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Binding Functions
    this.addNote = this.addNote.bind(this);
    this.customDate = this.customDate.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.chechNote = this.chechNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideChecked = this.hideChecked.bind(this);
    this.showAll = this.showAll.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleChange1st = this.handleChange1st.bind(this);
    this.handleChange2nd = this.handleChange2nd.bind(this);
    this.handleChangePassEntry = this.handleChangePassEntry.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRemoveBtn = this.handleRemoveBtn.bind(this);
    this.removePassword = this.removePassword.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.uuidv4 = this.uuidv4.bind(this);
    this.handleHeight = this.handleHeight.bind(this);

    theme.setRoot(this);

    this.state = {
      notes: [],
      unCheckedNotes: [],
      realPass: '',
      password: '',
      passwordConfirm: '',
      passwordEntry: '',
      passwordUpdated: false,
      passwordRemoved: false,
      dataLoaded: false,
      settingOn: false,
      modalOpen: false,
      locked: false,
      newPassMode: false,
      deleteConfirm: false,
      hideActive: false,
      scrollHeight: 0,
    }
  }
  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    try {
      const activeTheme = await AsyncStorage.getItem('@theme:key');
      if (activeTheme === 'light') {
        theme.active('light')
      } else {
        theme.active()
      }
    } catch(error) {
      // console.log(error)
    }
  }

  componentWillUnmount() { BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick) }
  
  async componentDidMount() {
    try {
      const protectedApp = await AsyncStorage.getItem('@PW:key');
      const value = await AsyncStorage.getItem('@notes:key');
      this.setState({
        realPass: protectedApp
      })
      if (value !== null) {
        let handleData = JSON.parse(value);
        setTimeout(() => {
          this.setState({
            notes: handleData,
            dataLoaded: true
          });
        }, 1200);
      } else {
        const defaultNote = [{ 
          noteId: 0, 
          noteText: 'You don\'t have any notes yet, remove this one and start add yours :)', 
          noteDate: this.customDate(), 
          noteStatus: false
        }];
        const parsedNote = JSON.stringify(defaultNote);
        const setValue = await AsyncStorage.setItem('@notes:key', parsedNote);
        this.setState({
          notes: defaultNote,
          dataLoaded: true,
        });
      }

      if (protectedApp !== null) {
        this.setState({locked : true})
      }

    } catch (error) {
      // console.log(error)
    }
  }
  uuidv4() {
    return 'yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  customDate() {
    const ntDate = new Date();
    const minutes = (ntDate.getMinutes()<10?'0':'') + ntDate.getMinutes();
    var time = ntDate.getHours();
    if (time > 12) {
        time = (time - 12) + ':' + minutes + 'pm';
    } else if (time === 0) {
        time = '12:' + minutes + 'am';
    } else {
        time = time + ':' + minutes + 'am';
    }
    const customDate = ntDate.getDate() + '/' + (ntDate.getMonth() + 1) + '/' + ntDate.getFullYear() + ' ' + time;
    return customDate;
  }
  async handleTheme() {
    if (theme.name === 'default') {
      theme.active('light');
      const setTheme = await AsyncStorage.setItem('@theme:key', 'light');
    } else if (theme.name === 'light') {
      const setTheme = await AsyncStorage.setItem('@theme:key', 'default');
      theme.active();
    }
  }
  async addNote(note) {
    const allNotes = this.state.notes;
    allNotes.push({
      noteId: this.uuidv4(),
      noteText: note,
      noteDate: this.customDate(),
      noteStatus: false,
    })
    const parseNotes = JSON.stringify(allNotes);
    try {
      const setValue = await AsyncStorage.setItem('@notes:key', parseNotes);
      this.setState({ notes: allNotes })
    } catch(error) {
      // console.log(error);
    }
  }
  async removeNote(noteId) {
    const allNotes = this.state.notes;
    const targetIndex = allNotes.findIndex(i => i.noteId === noteId);
    allNotes.splice(targetIndex, 1);
    const parseNotes = JSON.stringify(allNotes);
    try {
      const deleteValue = await AsyncStorage.setItem('@notes:key', parseNotes);
      this.setState({ notes: allNotes });
    } catch(error) {
      // console.log(error);
    }
  }
  async chechNote(noteId) {
    const allNotes = this.state.notes;
    const targetIndex = allNotes.findIndex(i => i.noteId === noteId);
    const targetIItem = allNotes[targetIndex];
    targetIItem.noteStatus = !targetIItem.noteStatus;
    allNotes[targetIndex] = targetIItem;
    const parseNotes = JSON.stringify(allNotes);
    try {
      const deleteValue = await AsyncStorage.setItem('@notes:key', parseNotes);
    } catch(error) {
      // console.log(error);
    }
  }
  async handleSubmit(noteId, updatedText) {
    const allNotes = this.state.notes;
    const targetIndex = allNotes.findIndex(i => i.noteId === noteId);
    const targetIItem = allNotes[targetIndex];
    targetIItem.noteText = updatedText;
    targetIItem.noteDate = this.customDate();
    allNotes[targetIndex] = targetIItem;
    const parseNotes = JSON.stringify(allNotes);
    try {
      const updateValue = await AsyncStorage.setItem('@notes:key', parseNotes)
    } catch(error) {
      // console.log(error);
    }
  }
  async hideChecked() {
    this.setState({  hideActive: true })
    const allNotes = await AsyncStorage.getItem('@notes:key');
    const parsed = JSON.parse(allNotes);
    var unCheckedNotes = this.state.unCheckedNotes;
    parsed.filter(function(item, index) {
      if (!item.noteStatus) {
        unCheckedNotes.push(item);
      }
    });
    this.setState({ notes: unCheckedNotes, unCheckedNotes: [] })
  }
  async showAll() {
    this.setState({ hideActive: false })
    const allNotes = await AsyncStorage.getItem('@notes:key');
    const parsed = JSON.parse(allNotes);
    this.setState({ notes: parsed })
  }
  handleForm() {
    this.setState({
      settingOn: !this.state.settingOn
    });
  }
  toggleModal(status) {
    this.setState({ modalOpen: status, passwordUpdated: false, deleteConfirm: false, passwordRemoved: false });
  }
  handleChange1st(e) {
    if (e !== '') {
      this.setState({ 
        password: e,
        newPassMode: true
      })
    } else {
      this.setState({ 
        password: e,
        newPassMode: false
      })
    }
  }
  handleChange2nd(e) {
    this.setState({ passwordConfirm: e })
  }
  handleChangePassEntry(e) {
    const realPass = this.state.realPass;
    this.setState({ passwordEntry: e })
    if (e === realPass) {
      this.setState({
        locked: false
      })
    }
  }
  handleRemoveBtn() {
    this.setState({
      deleteConfirm: true
    })
  }
  async removePassword() {
    try {
      const resetPassword = await AsyncStorage.setItem('@PW:key', '');
      this.setState({ 
        passwordRemoved: true,
        deleteConfirm: false
      })
    } catch(error) {
      // console.log(error);
    }
  }
  async handlePassword() {
    const pass = this.state.password;
    const confirm = this.state.passwordConfirm;
    if (pass !== '' && pass === confirm) {
      try {
        const setPassword = await AsyncStorage.setItem('@PW:key', pass);
        this.setState({
          password: '',
          passwordConfirm: '',
          passwordUpdated: true,
          newPassMode: false
        })
      } catch(error) {
        // console.log(error);
      }
    }
  }
  handleBackButtonClick() {
    if (this.state.settingOn) {
      this.setState({settingOn: false})
      return true;
    } else {
      return false;
    }
  }
  handleHeight(h) {
    if ( (h - this.state.scrollHeight) > 50 ) {this.refs.scrollview.scrollTo({y: h})}
    this.setState({scrollHeight: h})
  }
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor={(theme.name === 'default') ? '#121212' : '#40445e'}
          barStyle="light-content"
        />
        { this.state.dataLoaded ?
          this.state.locked ?
            <View style={styles.login} >
              <Text style={styles.loginHeading} >SimpllisT</Text>
              <FontAwesome style={styles.loginIcon} >{Icons.lock}</FontAwesome>
              <KeyboardAvoidingView behavior='height' style={{width: '100%', alignItems: 'center'}}>
                <TextInput
                  secureTextEntry={true}
                  selectionColor='#fff'
                  underlineColorAndroid='transparent' 
                  placeholderTextColor='#fff' 
                  placeholder='Password'
                  value={this.state.passwordEntry} 
                  onChangeText={this.handleChangePassEntry}
                  style={styles.loginInput} 
                />
              </KeyboardAvoidingView>
            </View>
          :
            <View style={{flex:1}}>
              <Navbar 
                switchNav={this.state.settingOn}
                hideChecked={this.hideChecked}
                showAll={this.showAll}
                handleTheme={this.handleTheme}
                handleForm={this.handleForm}
              />
              <ScrollView 
                ref='scrollview' 
                style={styles.appBackground} 
                onContentSizeChange={(contentWidth, contentHeight) => { this.handleHeight(contentHeight) }}
              >
                <View style={styles.content} >
                  {
                    this.state.notes.map((item, index) => {
                      return (
                        <Note
                          allNotesStatus={this.state.hideActive}
                          key={item.noteId}
                          noteId={item.noteId}
                          noteText={item.noteText} 
                          noteDate={item.noteDate}
                          noteStatus={item.noteStatus}
                          updateStatus={this.chechNote}
                          removeNote={this.removeNote}
                          newDate={this.customDate()}
                          handleSubmit={this.handleSubmit}
                          updateDate={this.customDate()}
                        />
                      )
                    })
                  }
                </View>
              </ScrollView>
              <Form
                inactiveForm={this.state.hideActive}
                switchForm={this.state.settingOn}
                handleForm={this.handleForm}
                addNote={this.addNote}
                toggleModal={() => this.toggleModal(true)}
              />
              <Modal
                animationType = {"slide"}
                transparent = {true}
                visible = {this.state.modalOpen}
                onRequestClose = {() => this.toggleModal(false)}
              >
                <View style = {styles.modal} >
                  <TouchableOpacity style={styles.modalBtns} onPress={() => this.toggleModal(false)} >
                    <FontAwesome style={[styles.modalBtnsText, {fontSize: 16, paddingVertical: 8}]} >{Icons.chevronLeft}</FontAwesome>
                  </TouchableOpacity>
                  { this.state.passwordUpdated ? 
                    <View style={{flexDirection: 'row', flex: 6}}>
                      <Text style={styles.passMsg} >Password Set Successfully</Text>
                    </View>
                  :
                    this.state.deleteConfirm ?
                      <View style={{flexDirection: 'row', flex: 6}}>
                        <Text style={styles.deleteMsg} >Are you want to remove lock ?</Text>
                        <TouchableOpacity style={styles.deleteBtn} onPress={this.removePassword} >
                          <FontAwesome style={styles.deleteBtnText} >{Icons.check}</FontAwesome>
                        </TouchableOpacity>
                      </View>
                    :
                      this.state.passwordRemoved ? 
                        <View style={{flex: 1}}>
                          <Text style={styles.passMsg} >Password Removed Successfully</Text>
                        </View>
                      :
                        <View style={{flexDirection: 'row', flex: 6}}>
                          <TextInput
                            secureTextEntry={true}
                            selectionColor='#fff'
                            underlineColorAndroid='transparent' 
                            placeholderTextColor='#fff' 
                            placeholder='Create new password'
                            value={this.state.password} 
                            onChangeText={this.handleChange1st}
                            style={[styles.formInput1st, {marginRight: 10}]} 
                          />
                          <TextInput
                            secureTextEntry={true}
                            selectionColor='#fff'
                            underlineColorAndroid='transparent' 
                            placeholderTextColor='#fff' 
                            placeholder='Confirm your password'
                            value={this.state.passwordConfirm} 
                            onChangeText={this.handleChange2nd} 
                            style={[styles.formInput1st, {width: '48%'}]} 
                          />
                          <TouchableOpacity style={styles.modalBtns} onPress={this.state.newPassMode ? this.handlePassword : this.handleRemoveBtn} >
                            <FontAwesome style={styles.modalBtnsText} >{this.state.newPassMode ? Icons.check : Icons.trash}</FontAwesome>
                          </TouchableOpacity>
                        </View>
                  }
                </View>
              </Modal>
            </View>
        :
          <Splash />
        }
      </View>
    );
  }
}