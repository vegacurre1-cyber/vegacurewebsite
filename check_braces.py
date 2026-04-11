import sys

def check_css_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    lines = content.split('\n')
    
    current_line = 1
    for i, char in enumerate(content):
        if char == '\n':
            current_line += 1
        
        if char == '{':
            stack.append(current_line)
        elif char == '}':
            if not stack:
                print(f"Extra closing brace '}}' at line {current_line}")
                return
            stack.pop()
    
    if stack:
        print(f"Unclosed block(s) starting at line(s): {stack}")
    else:
        print("Braces are balanced.")

if __name__ == "__main__":
    check_css_braces('p:/Vegacurre/css/style.css')
