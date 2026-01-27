import { Button } from '../components/Button';
import { Textarea } from '../../app/components/ui/textarea';

export function MessageSection() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Write Your Message</h2>

            <Textarea
                placeholder="Type your message here..."
                className="min-h-[150px] mb-4 resize-none"
            />

            <p className="text-xs text-gray-500 mb-4">
                Recruiter/Hiring announcement/Posting updates, or important information.
            </p>

            <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                    Save Draft
                </Button>
                <Button variant="outline" className="flex-1">
                    Preview
                </Button>
                <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                    Publish Post
                </Button>
            </div>
        </div>
    );
}
