export default function GenerateCodePanel({
  generatedCode,
}: {
  generatedCode: string;
}) {
  if (!generatedCode) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="text-center max-w-md">
          Your instructions will be translated into code by the computer when
          you click on the <b>RUN</b> button.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-2">
      <textarea
        className="w-full h-full bg-gray-100 rounded-lg p-2 font-mono resize-none" 
        value={generatedCode}
        readOnly
      />
    </div>
  );
}
