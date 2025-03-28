import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Info({ selectedBarber, selectedDate, selectedTime, selectedHaircut, onUpdate }) {
    const [date, setDate] = useState(selectedDate);
    const [time, setTime] = useState(selectedTime);
    const [haircut, setHaircut] = useState(selectedHaircut?.name || "");
    const [price, setPrice] = useState(selectedHaircut?.price || "");
    const [duration, setDuration] = useState(selectedHaircut?.duration || "");
    const availableTimes = selectedBarber?.times || [];
    const availableHaircuts = selectedBarber?.haircuts || [];

    useEffect(() => {
        if (haircut) {
            const selected = availableHaircuts.find(h => h.name === haircut);
            if (selected) {
                setPrice(selected.price);
                setDuration(selected.duration);
            }
        }
    }, [haircut, availableHaircuts]);

    useEffect(() => {
        if (!availableTimes.includes(time)) {
            setTime("");
        }
    }, [availableTimes]);

    return (
        <div className="flex flex-col gap-6 p-6 rounded-2xl shadow-lg bg-white">
            <div className="flex flex-wrap gap-6">
                <div className="flex flex-col w-full sm:w-1/2">
                    <Label>Date</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                    <Label>Available Times</Label>
                    <Select value={time} onValueChange={setTime}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableTimes.map((t, index) => (
                                <SelectItem key={index} value={t}>{t}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap gap-6">
                <div className="flex flex-col w-full sm:w-1/2">
                    <Label>Haircut</Label>
                    <Select value={haircut} onValueChange={setHaircut}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Haircut" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableHaircuts.map((h, index) => (
                                <SelectItem key={index} value={h.name}>{h.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                    <Label>Price</Label>
                    <Input type="text" value={price} disabled />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                    <Label>Duration</Label>
                    <Input type="text" value={duration} disabled />
                </div>
            </div>

            <Button className="self-end mt-4" onClick={() => onUpdate({ date, time, haircut, price, duration })}>
                Update Booking
            </Button>
        </div>
    );
}

   