import { Context, Scenes } from 'telegraf';
import { UserEntity } from './user.entity';

interface Session extends Scenes.WizardSessionData {}

export interface UserContext extends Context {
  user: UserEntity;
  scene: Scenes.SceneContextScene<UserContext, Session>;
  wizard: Scenes.WizardContextWizard<UserContext>;
}
