import { shallow, configure, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { EnterSection, ManagerSection } from ".";

configure({ adapter: new Adapter() });

describe("Slot", () => {
  beforeAll(() => {
    window.ethereum = {
      request: (_: any) => {},
      on: (_: any) => {},
    };
  });

  describe("EnterSection", () => {
    test("default state", () => {
      const handleEnter = jest.fn();

      const wrapper = shallow(
        <EnterSection enterStatus={""} handleEnter={handleEnter} />
      );
      expect(wrapper.find('[data-testid="amount-input"]')).toHaveValue(0);
      expect(wrapper.find('[data-testid="enter-button"]')).toBeDisabled();
    });
  });

  describe("ManagerSection", () => {
    let handlePickWinner: jest.Mock<any, any>;
    let wrapper: ShallowWrapper<any>;
    const pickButtonSelector = '[data-testid="pickWinner-button"]';

    beforeEach(() => {
      handlePickWinner = jest.fn();

      wrapper = shallow(
        <ManagerSection hasPlayers handlePickWinner={handlePickWinner} />
      );
    });

    test("non manager with players", () => {
      expect(wrapper.find(pickButtonSelector)).toHaveLength(0);
    });

    test("manager with players", () => {
      wrapper.setProps({ isManager: true });
      expect(wrapper.find(pickButtonSelector)).toHaveLength(1);
    });
  });

  describe("SlotSection", () => {});
  describe("InfoSection", () => {});
});
