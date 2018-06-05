import { Fonts } from '../src/Fonts';

const styles = {
  // Splash Screen
  splashWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1d201f',
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center'
  },
  splashText: {
    fontSize: 50,
    color: '#FBFFFE',
    fontFamily: Fonts.NunitoB,
    marginBottom: 20
  },
  splashFooter: {
    justifyContent: 'flex-end',
    paddingVertical: 10
  },
  footerText: {
    fontSize: 14,
    color: '#FBFFFE',
    fontFamily: Fonts.Nunito,
  },
  // Navbar
  navbar: {
    position: 'relative',
    backgroundColor: '#1d201f',
    paddingTop: 7,
    paddingBottom: 10,
    flexDirection: 'row',
    elevation: 5
  },
  navbarHeading: {
    flex: 1,
    paddingVertical: 2,
    fontSize: 22,
    color: '#FBFFFE',
    textAlign: 'center',
    fontFamily: Fonts.NunitoB
  },
  settingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 1
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%'
  },
  switchText: {
    color: '#FBFFFE',
    fontFamily: Fonts.NunitoB,
  },
  switchBtn: {
    marginTop: 2,
    marginHorizontal: 5
  },
  settingBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  navbarSettings: {
    color: '#FBFFFE',
    fontSize: 24,
  },
  // App Body
  appBackground: {
    backgroundColor: '#555'
  },
  content: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  // Note
  noteWrapper: {
    backgroundColor: '#ccc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  noteChecked: {
    backgroundColor: '#e09f7d',
  },
  noteBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#e09f7d'
  },
  noteText: {
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontFamily: Fonts.Nunito,
    color: '#000'
  },
  noteTextChecked: {
    fontFamily: Fonts.NunitoL,
    textDecorationLine: 'line-through'
  },
  noteInput: {
    color: '#000',
    fontFamily: Fonts.Nunito,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1d201f',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 15,
    elevation: 4
  },
  date: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 13,
    color: '#e09f7d',
    fontFamily: Fonts.NunitoB
  },
  buttonsWrap:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  check: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  checked: {
    backgroundColor: '#e09f7d',
    borderRadius: 5
  },
  checkedBtn: {
    color: '#fff'
  },
  delete: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  controlBtns: {
    color: '#e09f7d',
    fontSize: 13
  },
  formWrapper: {
    backgroundColor: '#1d201f',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderTopColor: '#121212',
    borderTopWidth: 2
  },
  form: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  formInput: {
    fontFamily: Fonts.Nunito,
    color: '#e09f7d',
    flex: 1
  },
  formButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e09f7d',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 9,
    marginTop: 8,
    marginLeft: 9
  },
  formBack: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 17
  },
  formSettingBtn: {
    flexDirection: 'row',
    backgroundColor: '#e09f7d',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 9
  },
  addBtn: {
    color: '#fff',
    fontSize: 16
  },
  moreBtn: {
    color: '#fff',
    fontSize: 18
  },
  btnText: {
    fontFamily: Fonts.Nunito,
    color: '#fff',
    fontSize: 13,
    marginRight: 5
  },
  modal: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    width: '100%',
    backgroundColor: '#1d201f',
    position: 'absolute',
    bottom: 0
  },
  formInput1st: {
    backgroundColor: '#e09f7d',
    flex: 1,
    width: '42%',
    height: 32,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 11,
    fontFamily: Fonts.Nunito
  },
  modalBtns: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  modalBtnsText: {
    textAlign: 'center',
    fontSize: 26,
    color: '#e09f7d'
  },
  passMsg: {
    backgroundColor: '#e09f7d',
    flex: 1,
    borderRadius: 5,
    marginBottom: 9,
    marginTop: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#fff',
    textAlign: 'center',
    fontFamily: Fonts.NunitoB
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d201f',
  },
  loginHeading: {
    fontSize: 50,
    color: '#FBFFFE',
    fontFamily: Fonts.NunitoB,
    marginBottom: 20
  },
  loginIcon: {
    fontSize: 150,
    color: '#aaa',
    marginBottom: 20
  },
  loginInput: {
    backgroundColor: '#e09f7d',
    fontFamily: Fonts.NunitoB,
    width: '60%',
    height: 40,
    paddingHorizontal: 13
  },
  deleteMsg: {
    backgroundColor: '#e09f7d',
    flex: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#fff',
    textAlign: 'center',
    fontFamily: Fonts.NunitoB
  },
  deleteBtn: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 13
  },
  deleteBtnText: {
    textAlign: 'center',
    fontSize: 26,
    color: '#e09f7d'
  }
}

module.exports = styles;