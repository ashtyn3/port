import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import {
	getQuickJS,
	newQuickJSAsyncWASMModule,
	newQuickJSWASMModuleFromVariant,
	RELEASE_ASYNC,
} from "quickjs-emscripten";
import { attr } from "./gui";

export const createContext = async () => {
	const QuickJSReleaseAsync = await newQuickJSWASMModuleFromVariant(variant);
	const ctx = QuickJSReleaseAsync.newContext();

	const consoleObj = ctx.newObject();
	const log = ctx.newFunction("log", (args) => {
		const nativeArgs = args.map(ctx.dump);
		console.log(nativeArgs);
	});
	const error = ctx.newFunction("error", (args) => {
		const nativeArgs = args.map(ctx.dump);
		console.error(nativeArgs);
	});
	ctx.setProp(consoleObj, "log", log);
	ctx.setProp(consoleObj, "error", error);
	ctx.setProp(
		ctx.global,
		"attr",
		ctx.newFunction("attr", (...args) => {
			const nativeArgs = args.map(ctx.dump);
			return attr(nativeArgs[0], nativeArgs[1]);
		})
	);
	ctx.setProp(ctx.global, "console", consoleObj);
	return ctx;
};

