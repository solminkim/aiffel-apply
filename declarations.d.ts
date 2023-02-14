import { Confettiful } from '@/components/Effect/effect';

declare global {
  interface Window {
    confettiful: Confettiful | undefined;
  }
}
