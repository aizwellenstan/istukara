import * as React from 'react';
import { ThemeProvider, styled } from '../../styles';
import { theme } from '../../styles/theme';
import { I18nextProvider } from 'react-i18next';
import { getLocale } from '../../../locales';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Events } from '../events';
import { Banner } from '../../components/banner';
import { GlobalStyle } from './global-style';

const locale = getLocale();

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

export const Root: React.SFC = React.memo(() => {

  return (
    <I18nextProvider i18n={locale}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Banner />

          <Switch>
            <Redirect exact from='/' to='/events' />
            <Route path='/events' component={Events} />
          </Switch>

          <GlobalStyle />
        </Wrapper>
      </ThemeProvider>
    </I18nextProvider>
  )
});