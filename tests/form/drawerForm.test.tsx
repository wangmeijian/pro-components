﻿import React from 'react';
import { ProFormText, DrawerForm, ModalForm } from '@ant-design/pro-form';
import { Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';

describe('DrawerForm', () => {
  it('📦 trigger will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm first no render items', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('input#test').exists()).toBeTruthy();
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm first render items', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        drawerProps={{
          forceRender: true,
        }}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeTruthy();
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm support submitter is false', async () => {
    const wrapper = mount(
      <DrawerForm visible trigger={<Button id="new">新建</Button>} submitter={false}>
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-drawer-footer').length).toBe(0);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm destroyOnClose', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        drawerProps={{ destroyOnClose: true }}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.setProps({
        visible: true,
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeTruthy();

    act(() => {
      wrapper.setProps({
        visible: false,
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('input#test').exists()).toBeFalsy();

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer close button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer close button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 reset button will simulate onVisibleChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-drawer-footer button.ant-btn').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer close button will simulate drawerProps.onClose', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer reset button will simulate drawerProps.onClose', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn').at(0).simulate('click');
    });

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 drawer reset button will simulate drawerProps.onCancel', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        drawerProps={{
          onClose: () => fn(false),
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 form onFinish return true should close drawer', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
        onFinish={async () => true}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 form onFinish is null, no close drawer', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        visible
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledTimes(1);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 getContainer is function', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref} />
        <DrawerForm
          drawerProps={{
            getContainer: () => ref.current!,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 getContainer is string', async () => {
    const ref = React.createRef<HTMLDivElement>();
    document.getElementById = () => ref.current;
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref} />
        <DrawerForm
          drawerProps={{
            getContainer: 'render-form',
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 getContainer is element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const Demo = () => (
      <div>
        <div id="render-form" ref={ref} />
        <DrawerForm
          drawerProps={{
            getContainer: ref.current!,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </DrawerForm>
      </div>
    );

    const wrapper = mount(<Demo />);

    act(() => {
      wrapper.setProps({
        id: '1212',
      });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 ModalForm getContainer is function', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref} />
        <ModalForm
          modalProps={{
            getContainer: () => ref.current!,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </ModalForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 ModalForm getContainer is string', async () => {
    const ref = React.createRef<HTMLDivElement>();
    document.getElementById = () => ref.current;
    const wrapper = mount(
      <div>
        <div id="render-form" ref={ref} />
        <ModalForm
          modalProps={{
            getContainer: 'render-form',
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </ModalForm>
      </div>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 submitter config no reset default config', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DrawerForm
        width={600}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
          resetButtonProps: {
            style: {
              width: '80px',
            },
            id: 'reset',
          },
        }}
        trigger={<Button id="new">新建</Button>}
        onVisibleChange={(visible) => fn(visible)}
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.find('button#reset').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(false);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 ModalForm getContainer is element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const Demo = () => (
      <div>
        <div id="render-form" ref={ref} />
        <ModalForm
          modalProps={{
            getContainer: ref.current || undefined,
          }}
          trigger={
            <Button id="new" type="primary">
              新建
            </Button>
          }
        >
          <ProFormText name="name" />
        </ModalForm>
      </div>
    );

    const wrapper = mount(<Demo />);
    act(() => {
      wrapper.setProps({
        id: '1212',
      });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#new').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('#render-form').render().find('.ant-form').length).toBe(1);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm close no rerender from', async () => {
    const wrapper = mount(
      <DrawerForm
        initialValues={{
          name: '1234',
        }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);
    act(() => {
      wrapper
        .find('.ant-input#test')
        .at(0)
        .simulate('change', {
          target: {
            value: 'test',
          },
        });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Input#test').props().value).toEqual('test');
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('Input#test').props().value).toEqual('test');

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 DrawerForm destroyOnClose close will rerender from', async () => {
    const wrapper = mount(
      <DrawerForm
        drawerProps={{
          getContainer: false,
          destroyOnClose: true,
        }}
        initialValues={{
          name: '1234',
        }}
        trigger={<Button id="new">新建</Button>}
      >
        <ProFormText
          name="name"
          fieldProps={{
            id: 'test',
          }}
        />
      </DrawerForm>,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button#new').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 300);
    act(() => {
      wrapper
        .find('.ant-input#test')
        .at(0)
        .simulate('change', {
          target: {
            value: '1111',
          },
        });
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Input#test').props().value).toEqual('1111');

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-drawer-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button#new').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('Input#test').props().value).toEqual('1234');

    act(() => {
      wrapper.unmount();
    });
  });

  it('📦 model no render Form when destroyOnClose', () => {
    const html = render(
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </ModalForm>,
    );

    expect(html.baseElement.querySelector('form')).toBeFalsy();
    html.unmount();
  });
  it('📦 drawer no render Form when destroyOnClose', () => {
    const html = render(
      <DrawerForm
        drawerProps={{
          destroyOnClose: true,
        }}
        trigger={
          <Button id="new" type="primary">
            新建
          </Button>
        }
      >
        <ProFormText name="name" />
      </DrawerForm>,
    );

    expect(html.baseElement.querySelector('form')).toBeFalsy();
    html.unmount();
  });
});
