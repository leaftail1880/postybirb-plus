import { Config, Connect, ConnectEvents } from '@vkontakte/superappkit';
import { Button, Form, Icon, InputNumber, message } from 'antd';
import { VKontakteAccountData } from 'postybirb-commons';
import React from 'react';
import BrowserLink from '../../components/BrowserLink';
import LoginService from '../../services/login.service';
import { Authorizer } from '../interfaces/authorizer.interface';
import { LoginDialogProps } from '../interfaces/website.interface';

interface State extends VKontakteAccountData {
  sending: boolean;
  displayAuthDialog: boolean;
}

export default class VKontakteLogin extends React.Component<LoginDialogProps, State> {
  private popupRef = React.createRef<any>();
  private authorizer: Authorizer;

  state: State = {
    appId: 0,
    token: '',
    sending: false,
    displayAuthDialog: false
  };

  constructor(props: LoginDialogProps) {
    super(props);
    this.state = {
      ...this.state,
      ...(props.data as State)
    };
    this.authorizer = window.electron.auth.VKontakte;
    this.authorizer.start(this.updateAuthData.bind(this));
  }

  updateAuthData(data: VKontakteAccountData) {
    LoginService.setAccountData(this.props.account._id, data).then(() => {
      message.success('VKontakte Authenticated.');
    });
  }

  isValid() {
    return !isNaN(this.state.appId) && this.state.appId > 0;
  }

  async submit() {
    throw new Error('NOT IMPLEMENTED');
  }

  auth() {
    Config.init({
      appId: this.state.appId // Идентификатор приложения
    });

    const url = this.authorizer.getAuthURL();

    const oneTapButton = Connect.buttonOneTapAuth({
      callback(e) {
        const type = e.type;
        if (!type) {
          return false;
        }

        switch (type) {
          case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS: // = 'VKSDKOneTapAuthLoginSuccess'
            console.log(e);

            return false;

          // Для этих событий нужно открыть полноценный VK ID чтобы
          // пользователь дорегистрировался или подтвердил телефон

          case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED: //  = 'VKSDKOneTapAuthFullAuthNeeded'
          case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED: // = 'VKSDKOneTapAuthPhoneValidationNeeded'
          case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
            return Connect.redirectAuth({
              url: url, // url - строка с url, на который будет произведён редирект после авторизации.
              state: 'PUT_STATE_HERE'
            }); // state - состояние вашего приложение или любая произвольная строка, которая будет добавлена к url после авторизации.

          // Пользователь перешел по кнопке "Войти другим способом"
          case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
            // Параметр screen: phone позволяет сразу открыть окно ввода телефона в VK ID
            // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
            return Connect.redirectAuth({ screen: 'phone', url: url });
        }

        return false;
      },

      // Не обязательный параметр с настройками отображения OneTap
      options: {
        showAlternativeLogin: true, // Отображение кнопки "Войти другим способом"
        displayMode: 'default', // Режим отображения кнопки 'default' | 'name_phone' | 'phone_name'
        buttonStyles: {
          borderRadius: 8 // Радиус скругления кнопок
        }
      }
    });

    // Получить iframe можно с помощью метода getFrame()
    return oneTapButton?.getFrame();
  }

  render() {
    return (
      <div className="container m-6">
        <Form
          layout="vertical"
          onSubmit={e => {
            e.preventDefault();
            if (this.isValid()) {
              this.submit();
            }
          }}
        >
          <Form.Item
            label="App Id"
            required
            extra={
              <div>
                <BrowserLink url="https://vk.com/editapp?act=create">
                  You must create you own Standalone app <Icon type="link" />
                </BrowserLink>
                <span>You can find ID in app options ("Настройки")</span>
              </div>
            }
          >
            <InputNumber
              className="w-full"
              value={this.state.appId}
              onChange={value => this.setState({ appId: value! })}
            />
          </Form.Item>
          <Form.Item>
            <Button
              disabled={!this.isValid()}
              onClick={() => this.setState({ displayAuthDialog: true })}
              loading={this.state.sending}
              block
            >
              Authenticate
            </Button>
          </Form.Item>
        </Form>

        {this.state.displayAuthDialog && (
          <div dangerouslySetInnerHTML={{ __html: this.auth()?.outerHTML ?? '' }}></div>
        )}
      </div>
    );
  }
}
