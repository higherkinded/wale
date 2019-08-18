/* @jsx Wale.e */
import Wale, {
  WaleDOM,
  Props,
  VirtualElement,
  Component
} from '..';

const El2 = async (props: any, children: any[]) => {
  console.log(props);
  return (
    <div style={{ background: '#333', color: '#fff' }}>
      {children}
    </div>
  );
};

interface El3Props extends Props {
  n: number
}

const mkColor = (n: number) => {
  const colors = [n, n + 2, n + 4]
    .map(m => 160 + (m * 15) % 90);
  return `rgb(${colors.join()})`;
}

const Cdiv = async ({ n }: El3Props, children: VirtualElement[]) => (
  <div
    style={{
      borderColor: mkColor(n),
      borderWidth: '3px',
      borderStyle: 'solid',
      textAlign: 'center',
      fontFamily: 'monospace',
      fontWeight: 600,
      fontSize: '15px',
      lineHeight: '2em',
      padding: '5px',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div >
);

const Dot = async () => (
  <span
    style={{
      display: 'inline-block',
      width: '5px',
      height: '5px',
      margin: '2px 10px',
      background: 'black',
      borderRadius: '3px',
    }}
  ></span>
);

const Dotted = async (props: {}, children: VirtualElement[]) => (
  <span>
    <span><Dot /></span>
    <span style={{ display: 'inline-block' }}>
      {children}
    </span>
    <span><Dot /></span>
  </span>
)

const El3 =
  async ({ n }: El3Props, children: VirtualElement[], context: {}) => {
    return (
      n > 0
        ? (
          <Cdiv n={n}>
            I'm a recursive component! N={n}
            <El3 n={n - 1} />
          </Cdiv>
        ) : (
          <Cdiv n={n}>
            <Dotted>
              I'm a tail branch of a recursive component!
            </Dotted>
          </Cdiv>
        )
    )
  };

const El: Component<{}> = async (props: {}, children: VirtualElement[]) => {
  return (
    <div id="App" className="a" onClick={() => console.log('click!')}>
      <El2>
        Stunsail
      </El2>
      <El3 n={15} />
    </div>
  );
};

WaleDOM.render(<El />, document.getElementById('root'));
