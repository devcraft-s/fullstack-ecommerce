import "node:module";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";
var __defProp = Object.defineProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
import.meta.url;
//#endregion
//#region .vite-source-tags.js
var _vite_source_tags_exports = /* @__PURE__ */ __exportAll({ sourceTags: () => sourceTags });
function sourceTags() {
	let projectRoot = "";
	return {
		name: "vite-source-tags",
		enforce: "pre",
		configResolved(config) {
			projectRoot = config.root;
		},
		transform(code, id) {
			if (!/\.[jt]sx$/.test(id)) return null;
			if (id.includes("node_modules")) return null;
			let ast;
			try {
				ast = parse(code, {
					sourceType: "module",
					plugins: ["jsx", "typescript"]
				});
			} catch {
				return null;
			}
			let modified = false;
			traverse(ast, { JSXOpeningElement(path) {
				const node = path.node;
				if (t.isJSXIdentifier(node.name) && node.name.name === "Fragment") return;
				if (t.isJSXMemberExpression(node.name) && t.isJSXIdentifier(node.name.property) && node.name.property.name === "Fragment") return;
				if (!node.name.name && t.isJSXNamespacedName(node.name)) return;
				const loc = node.loc;
				if (!loc) return;
				if (node.attributes.some((attr) => t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name) && attr.name.name === "data-source-loc")) return;
				const value = `${id.startsWith(projectRoot) ? id.slice(projectRoot.length + 1) : id}:${loc.start.line}:${loc.start.column}`;
				node.attributes.push(t.jsxAttribute(t.jsxIdentifier("data-source-loc"), t.stringLiteral(value)));
				modified = true;
			} });
			if (!modified) return null;
			const output = generate(ast, { retainLines: true }, code);
			return {
				code: output.code,
				map: output.map
			};
		}
	};
}
var traverse, generate;
var init__vite_source_tags = __esmMin((() => {
	traverse = _traverse.default || _traverse;
	generate = _generate.default || _generate;
}));
var vite_config_default = defineConfig(async () => {
	const plugins = [react(), tailwindcss()];
	try {
		const m = await Promise.resolve().then(() => (init__vite_source_tags(), _vite_source_tags_exports));
		plugins.push(m.sourceTags());
	} catch {}
	return { plugins };
});
//#endregion
export { vite_config_default as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiRDovbXlQb3J0Zm9saW8vLnZpdGUtc291cmNlLXRhZ3MuanMiLCJEOi9teVBvcnRmb2xpby92aXRlLmNvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFZpdGUgcGx1Z2luIHRoYXQgYWRkcyBkYXRhLXNvdXJjZS1sb2M9XCJmaWxlOmxpbmU6Y29sXCIgYXR0cmlidXRlcyB0byBldmVyeVxuICogSlNYIGVsZW1lbnQgYXQgY29tcGlsZSB0aW1lLiBUaGlzIGVuYWJsZXMgdGhlIGVsZW1lbnQgcGlja2VyIHRvIG1hcCByZW5kZXJlZFxuICogRE9NIG5vZGVzIGJhY2sgdG8gdGhlaXIgc291cmNlIGZpbGUgYW5kIGxpbmUgbnVtYmVyLlxuICpcbiAqIEFjdGl2ZSBpbiBib3RoIGRldiBhbmQgYnVpbGQgc28gdGhlIGVsZW1lbnQgcGlja2VyIHdvcmtzIG9uIGRlcGxveWVkIHByZXZpZXdzLlxuICpcbiAqIFVzZXMgQGJhYmVsL3BhcnNlciwgQGJhYmVsL3RyYXZlcnNlLCBhbmQgQGJhYmVsL2dlbmVyYXRvciB3aGljaCBhcmUgYWxyZWFkeVxuICogdHJhbnNpdGl2ZSBkZXBlbmRlbmNpZXMgb2YgQHZpdGVqcy9wbHVnaW4tcmVhY3QgKG5vIGV4dHJhIGluc3RhbGwgbmVlZGVkKS5cbiAqL1xuXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ0BiYWJlbC9wYXJzZXInO1xuaW1wb3J0IF90cmF2ZXJzZSBmcm9tICdAYmFiZWwvdHJhdmVyc2UnO1xuaW1wb3J0IF9nZW5lcmF0ZSBmcm9tICdAYmFiZWwvZ2VuZXJhdG9yJztcbmltcG9ydCAqIGFzIHQgZnJvbSAnQGJhYmVsL3R5cGVzJztcblxuLy8gSGFuZGxlIENKUyBkZWZhdWx0IGV4cG9ydCBpbnRlcm9wXG5jb25zdCB0cmF2ZXJzZSA9IF90cmF2ZXJzZS5kZWZhdWx0IHx8IF90cmF2ZXJzZTtcbmNvbnN0IGdlbmVyYXRlID0gX2dlbmVyYXRlLmRlZmF1bHQgfHwgX2dlbmVyYXRlO1xuXG5leHBvcnQgZnVuY3Rpb24gc291cmNlVGFncygpIHtcbiAgbGV0IHByb2plY3RSb290ID0gJyc7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZS1zb3VyY2UtdGFncycsXG4gICAgZW5mb3JjZTogJ3ByZScsXG5cbiAgICBjb25maWdSZXNvbHZlZChjb25maWcpIHtcbiAgICAgIHByb2plY3RSb290ID0gY29uZmlnLnJvb3Q7XG4gICAgfSxcblxuICAgIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgaWYgKCEvXFwuW2p0XXN4JC8udGVzdChpZCkpIHJldHVybiBudWxsO1xuICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGxldCBhc3Q7XG4gICAgICB0cnkge1xuICAgICAgICBhc3QgPSBwYXJzZShjb2RlLCB7XG4gICAgICAgICAgc291cmNlVHlwZTogJ21vZHVsZScsXG4gICAgICAgICAgcGx1Z2luczogWydqc3gnLCAndHlwZXNjcmlwdCddLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgbGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cbiAgICAgIHRyYXZlcnNlKGFzdCwge1xuICAgICAgICBKU1hPcGVuaW5nRWxlbWVudChwYXRoKSB7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHBhdGgubm9kZTtcblxuICAgICAgICAgIC8vIFNraXAgZnJhZ21lbnRzICg8PiAvIDxSZWFjdC5GcmFnbWVudD4pXG4gICAgICAgICAgaWYgKHQuaXNKU1hJZGVudGlmaWVyKG5vZGUubmFtZSkgJiYgbm9kZS5uYW1lLm5hbWUgPT09ICdGcmFnbWVudCcpIHJldHVybjtcbiAgICAgICAgICBpZiAodC5pc0pTWE1lbWJlckV4cHJlc3Npb24obm9kZS5uYW1lKSAmJlxuICAgICAgICAgICAgICB0LmlzSlNYSWRlbnRpZmllcihub2RlLm5hbWUucHJvcGVydHkpICYmXG4gICAgICAgICAgICAgIG5vZGUubmFtZS5wcm9wZXJ0eS5uYW1lID09PSAnRnJhZ21lbnQnKSByZXR1cm47XG4gICAgICAgICAgaWYgKCFub2RlLm5hbWUubmFtZSAmJiB0LmlzSlNYTmFtZXNwYWNlZE5hbWUobm9kZS5uYW1lKSkgcmV0dXJuO1xuXG4gICAgICAgICAgY29uc3QgbG9jID0gbm9kZS5sb2M7XG4gICAgICAgICAgaWYgKCFsb2MpIHJldHVybjtcblxuICAgICAgICAgIC8vIFNraXAgaWYgYWxyZWFkeSB0YWdnZWQgKGF2b2lkIGRvdWJsZS10cmFuc2Zvcm0gb24gSE1SKVxuICAgICAgICAgIGNvbnN0IGFscmVhZHlUYWdnZWQgPSBub2RlLmF0dHJpYnV0ZXMuc29tZShcbiAgICAgICAgICAgIGF0dHIgPT4gdC5pc0pTWEF0dHJpYnV0ZShhdHRyKSAmJlxuICAgICAgICAgICAgICAgICAgICB0LmlzSlNYSWRlbnRpZmllcihhdHRyLm5hbWUpICYmXG4gICAgICAgICAgICAgICAgICAgIGF0dHIubmFtZS5uYW1lID09PSAnZGF0YS1zb3VyY2UtbG9jJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGFscmVhZHlUYWdnZWQpIHJldHVybjtcblxuICAgICAgICAgIGNvbnN0IHJlbFBhdGggPSBpZC5zdGFydHNXaXRoKHByb2plY3RSb290KVxuICAgICAgICAgICAgPyBpZC5zbGljZShwcm9qZWN0Um9vdC5sZW5ndGggKyAxKVxuICAgICAgICAgICAgOiBpZDtcblxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYCR7cmVsUGF0aH06JHtsb2Muc3RhcnQubGluZX06JHtsb2Muc3RhcnQuY29sdW1ufWA7XG5cbiAgICAgICAgICBub2RlLmF0dHJpYnV0ZXMucHVzaChcbiAgICAgICAgICAgIHQuanN4QXR0cmlidXRlKFxuICAgICAgICAgICAgICB0LmpzeElkZW50aWZpZXIoJ2RhdGEtc291cmNlLWxvYycpLFxuICAgICAgICAgICAgICB0LnN0cmluZ0xpdGVyYWwodmFsdWUpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIG1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIW1vZGlmaWVkKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3Qgb3V0cHV0ID0gZ2VuZXJhdGUoYXN0LCB7IHJldGFpbkxpbmVzOiB0cnVlIH0sIGNvZGUpO1xuICAgICAgcmV0dXJuIHsgY29kZTogb3V0cHV0LmNvZGUsIG1hcDogb3V0cHV0Lm1hcCB9O1xuICAgIH0sXG4gIH07XG59XG4iLCJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBsdWdpbnMgPSBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKV07XG4gIHRyeSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IG0gPSBhd2FpdCBpbXBvcnQoJy4vLnZpdGUtc291cmNlLXRhZ3MuanMnKTtcbiAgICBwbHVnaW5zLnB1c2gobS5zb3VyY2VUYWdzKCkpO1xuICB9IGNhdGNoIHt9XG4gIHJldHVybiB7IHBsdWdpbnMgfTtcbn0pXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLFNBQWdCLGFBQWE7Q0FDM0IsSUFBSSxjQUFjO0FBRWxCLFFBQU87RUFDTCxNQUFNO0VBQ04sU0FBUztFQUVULGVBQWUsUUFBUTtBQUNyQixpQkFBYyxPQUFPOztFQUd2QixVQUFVLE1BQU0sSUFBSTtBQUNsQixPQUFJLENBQUMsWUFBWSxLQUFLLEdBQUcsQ0FBRSxRQUFPO0FBQ2xDLE9BQUksR0FBRyxTQUFTLGVBQWUsQ0FBRSxRQUFPO0dBRXhDLElBQUk7QUFDSixPQUFJO0FBQ0YsVUFBTSxNQUFNLE1BQU07S0FDaEIsWUFBWTtLQUNaLFNBQVMsQ0FBQyxPQUFPLGFBQWE7S0FDL0IsQ0FBQztXQUNJO0FBQ04sV0FBTzs7R0FHVCxJQUFJLFdBQVc7QUFFZixZQUFTLEtBQUssRUFDWixrQkFBa0IsTUFBTTtJQUN0QixNQUFNLE9BQU8sS0FBSztBQUdsQixRQUFJLEVBQUUsZ0JBQWdCLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxTQUFTLFdBQVk7QUFDbkUsUUFBSSxFQUFFLHNCQUFzQixLQUFLLEtBQUssSUFDbEMsRUFBRSxnQkFBZ0IsS0FBSyxLQUFLLFNBQVMsSUFDckMsS0FBSyxLQUFLLFNBQVMsU0FBUyxXQUFZO0FBQzVDLFFBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFLG9CQUFvQixLQUFLLEtBQUssQ0FBRTtJQUV6RCxNQUFNLE1BQU0sS0FBSztBQUNqQixRQUFJLENBQUMsSUFBSztBQVFWLFFBTHNCLEtBQUssV0FBVyxNQUNwQyxTQUFRLEVBQUUsZUFBZSxLQUFLLElBQ3RCLEVBQUUsZ0JBQWdCLEtBQUssS0FBSyxJQUM1QixLQUFLLEtBQUssU0FBUyxrQkFFekIsQ0FBZTtJQU1uQixNQUFNLFFBQVEsR0FKRSxHQUFHLFdBQVcsWUFBVyxHQUNyQyxHQUFHLE1BQU0sWUFBWSxTQUFTLEVBQUMsR0FDL0IsR0FFcUIsR0FBRyxJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTTtBQUV4RCxTQUFLLFdBQVcsS0FDZCxFQUFFLGFBQ0EsRUFBRSxjQUFjLGtCQUFrQixFQUNsQyxFQUFFLGNBQWMsTUFBSyxDQUN2QixDQUNEO0FBRUQsZUFBVztNQUVkLENBQUM7QUFFRixPQUFJLENBQUMsU0FBVSxRQUFPO0dBRXRCLE1BQU0sU0FBUyxTQUFTLEtBQUssRUFBRSxhQUFhLE1BQU0sRUFBRSxLQUFLO0FBQ3pELFVBQU87SUFBRSxNQUFNLE9BQU87SUFBTSxLQUFLLE9BQU87SUFBSzs7RUFFaEQ7Ozs7QUExRUcsWUFBVyxVQUFVLFdBQVc7QUFDaEMsWUFBVyxVQUFVLFdBQVc7O0FDYnRDLElBQUEsc0JBQWUsYUFBYSxZQUFZO0NBQ3RDLE1BQU0sVUFBVSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUM7QUFDeEMsS0FBSTtFQUVGLE1BQU0sSUFBSSxNQUFBLFFBQUEsU0FBQSxDQUFBLFlBQUEsd0JBQUEsRUFBQSwyQkFBQTtBQUNWLFVBQVEsS0FBSyxFQUFFLFlBQVksQ0FBQztTQUN0QjtBQUNSLFFBQU8sRUFBRSxTQUFTO0VBQ25CIn0=