declare global {
  interface Array<T> {
    peek(): string;
  }
}

Array.prototype.peek = function () {
  return this[this.length - 1];
};

type operator = {
  priority: number;
  math?: (op1: number, op2: number) => number;
  type?: string;
};

const opArr: [string, operator][] = [
  [
    "√",
    {
      priority: 4,
      math: (op1: number, op2: number) => {
        if (op1 < 0) throw { message: "sqrt argument must be gte zero" };
        return Math.sqrt(op1);
      },
      type: "unary",
    },
  ],
  [
    "%",
    {
      priority: 3,
      math: (op1: number, op2: number) => op1 % op2,
      type: "binary",
    },
  ],
  [
    "*",
    {
      priority: 3,
      math: (op1: number, op2: number) => op1 * op2,
      type: "binary",
    },
  ],
  [
    "/",
    {
      priority: 3,
      math: (op1: number, op2: number) => op1 / op2,
      type: "binary",
    },
  ],
  [
    "+",
    {
      priority: 2,
      math: (op1: number, op2: number) => {
        if (op1) return op1 + op2; // binary
        return op2; // unary
      },
      type: "binary",
    },
  ],
  [
    "-",
    {
      priority: 2,
      math: (op1: number, op2: number) => {
        if (op1) return op1 - op2; // binary
        return -op2; // unary
      },
      type: "binary",
    },
  ],
  ["(", { priority: 1 }],
];

const operators = new Map<string, operator>(opArr);

function toPostfix(statement: String) {
  let tokens = statement.split(""),
    opstack: string[] = [],
    postfix: string[] = [],
    isFloat = false,
    isNumber = false;
  tokens.forEach((token) => {
    if (token == " ") return;
    else if (token == ",") {
      isFloat = true;
      postfix[postfix.length - 1] += token;
    } else if (token.match(/\d/)) {
      if (isFloat || isNumber) postfix[postfix.length - 1] += token;
      else postfix.push(token);
      isNumber = true;
    } else if (token == "(") {
      isFloat = isNumber = false;
      opstack.push(token);
    } else if (token == ")") {
      isFloat = isNumber = false;
      let subtoken: any = opstack.pop();
      while (subtoken != "(") {
        postfix.push(subtoken);
        subtoken = opstack.pop();
      }
    } else if (operators.has(token)) {
      isFloat = isNumber = false;
      while (
        opstack.length &&
        operators.get(opstack.peek())!.priority >=
          operators.get(token)!.priority
      ) {
        const next = opstack.pop();
        next && postfix.push(next);
      }

      opstack.push(token);
    }
  });
  while (opstack.length) {
    const next = opstack.pop();
    next && postfix.push(next);
  }
  return postfix;
}

export default function calculate(statement: string) {
  let opstack: number[] = [],
    tokens = toPostfix(statement);
  tokens.forEach((token) => {
    const op: operator = operators.get(token)!;
    if (op) {
      let first = opstack.pop()!,
        second;
      if (op.type == "binary") {
        second = opstack.pop()!;
        opstack.push(op.math!(second, first));
      } else {
        opstack.push(op.math!(first, 1));
      }
    } else opstack.push(parseFloat(token));
  });
  const res = opstack.pop()!.toString().split(".");
  if (res[1]) {
    return parseFloat(res.join(".")).toFixed(2);
  }
  return parseInt(res[0]);
}
